defmodule DictaorGame.Participant do
  alias DictaorGame.Actions

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def change_allo_temp(data, id, allo_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    "allocating" = get_in(data, [:pairs, pair_id, :state])
    Actions.change_allo_temp(data, id, allo_temp)
  end

  def finish_allocating(data, id, allo_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    put_in(data, [:pairs, pair_id, :state], "judging")
    |> Actions.finish_allocating(id, allo_temp)
  end

  def get_next_role(role) do
    case role == "responder" do
      true -> "dictator"
      false -> "responder"
    end
  end

  def response(data, id, result) do
    value = get_in(result, ["value"])
    change_count = get_in(result, ["change_count"])
    now_round = get_in(result, ["now_round"])
    pair_id = get_in(data, [:participants, id, :pair_id])
    game_round = get_in(data, [:game_round])
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
    id_role = get_in(data, [:participants, id, :role])
    target_id_role = get_in(data, [:participants, target_id, :role])
    id_point = get_in(data, [:participants, id, :point])
    target_id_point = get_in(data, [:participants, target_id, :point])
    put_in(data, [:participants, id, :role], get_next_role(id_role))
    |> put_in([:participants, target_id, :role], get_next_role(target_id_role))
    |> put_in([:participants, id, :point],
      case id_role == "responder" do
         true -> id_point + (1000 - value)
         false -> id_point + value
      end
    )
    |> put_in([:participants, target_id, :point],
      case target_id_role == "responder" do
         true -> target_id_point + (1000 - value)
         false -> target_id_point + value
      end
    )
    |> put_in([:pairs, pair_id, :redo_count], 0)
    |> put_in([:pairs, pair_id, :state],
     case now_round < game_round do
       true -> "allocating"
       false -> "finished"
     end
    )
    |> put_in([:pairs, pair_id, :now_round],
    case now_round < game_round do
      true -> now_round + 1
      false -> now_round
    end
    )
    |> put_in([:dictator_results], Map.merge( get_in(data, [:dictator_results]), %{
      Integer.to_string(now_round) => Map.merge( get_in(data, [:dictator_results,
         Integer.to_string(now_round)]) || %{}, %{
        pair_id => %{
            value: value,
            change_count: change_count,
          }
       })
    }))
  end

  def response_ok(data, id, result) do
    response(data, id, result)
    |> Actions.response_ok(id, result)
  end


  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
      game_round: data.game_round,
      game_progress: data.game_progress,
    }
  end

  def format_pair(pair) do
    %{
      members: pair.members,
      now_round: pair.now_round,
      allo_temp: pair.allo_temp,
      state: pair.state,
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    pair_id = get_in(data, [:participants, id, :pair_id])
    unless is_nil(pair_id) do
      pair = get_in(data, [:pairs, pair_id])
      format_participant(participant)
      |> Map.merge(format_data(data))
      |> Map.merge(format_pair(pair))
    else
      format_participant(participant)
      |> Map.merge(format_data(data))
    end
  end
end

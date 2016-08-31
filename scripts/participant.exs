defmodule TrustGame.Participant do
  alias TrustGame.Actions

  require Logger
  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def sync_inv_temp(data, id, inv_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    target_id = getTargetId(data, id)
    if "investing" == get_in(data, [:pairs, pair_id, :pair_state]) do
      Actions.sync_inv_temp(data, target_id, inv_temp)
    else
      data
    end
  end

  def finish_investing(data, id, inv_final) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    target_id = getTargetId(data, id)
    if "investing" == get_in(data, [:pairs, pair_id, :pair_state]) do
      put_in(data, [:pairs, pair_id, :pair_state], "responding")
      put_in(data, [:pairs, pair_id, :inv_final], inv_final)
      |> Actions.finish_investing(pair_id, target_id, inv_final)
    else
      data
    end
  end

  def sync_res_temp(data, id, res_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    target_id = getTargetId(data, id)
    if "responding" == get_in(data, [:pairs, pair_id, :pair_state]) do
      Actions.sync_res_temp(data, target_id, res_temp)
    else
      data
    end
  end

  def finish_responding(data, id, res_final) do
    Logger.debug("[aaaaaaa]")
    game_point = get_in(data, [:game_point])
    game_rate = get_in(data, [:game_rate])
    pair_id = get_in(data, [:participants, id, :pair_id])
    pair_round = get_in(data, [:pairs, pair_id, :pair_round])
    inv_final = get_in(data, [:pairs, pair_id, :inv_final])
    target_id = getTargetId(data, id)
    next_state = case get_in(data, [:pairs, pair_id, :pair_round]) < get_in(data, [:game_round]) do
      true -> "investing"
      false -> "finished"
    end
    if "responding" == get_in(data, [:pairs, pair_id, :pair_state]) do
      put_in(data, [:pairs, pair_id, :pair_state], next_state)
      |> put_in([:pairs, pair_id, :pair_round], getNextPairRound(data, pair_id))
      |> put_in([:participants, id, :role], getNextRole(get_in(data, [:participants, id, :role])))
      |> put_in([:participants, target_id, :role], getNextRole(get_in(data, [:participants, target_id, :role])))
      |> put_in([:participants, id, :point], game_point - res_final + get_in(data, [:participants, id, :point]))
      |> put_in([:participants, target_id, :point], res_final + get_in(data, [:participants, target_id, :point]))
      |> put_in([:trust_results], Map.merge(get_in(data, [:trust_results]), %{
        Integer.to_string(pair_round) => Map.merge(get_in(data, [:trust_results,
           Integer.to_string(pair_round)]) || %{}, %{
          pair_id => %{
            hold:   inv_final*game_rate - res_final,
            return: res_final,
          }
        })
      }))
      |> Actions.finish_responding(id, pair_id, target_id, res_final)
    else
      Logger.debug("[ccccccccccc?]")
      data
    end
  end

  def getNextRole(role) do
    case role == "responder" do
      true -> "investor"
      false -> "responder"
    end
  end

  def getTargetId(data, id) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
  end

  def getNextPairRound(data, pair_id) do
    game_round = get_in(data, [:game_round])
    pair_round = get_in(data, [:pairs, pair_id, :pair_round])
    case pair_round < game_round do
      true -> pair_id + 1
      false -> pair_id
    end
  end


  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      game_page: data.game_page,
      game_round: data.game_round,
      game_point: data.game_point,
      game_rate: data.game_rate,
      game_progress: data.game_progress,
    }
  end

  def format_pair(pair) do
    %{
      members: pair.members,
      pair_round: pair.pair_round,
      inv_temp: pair.inv_temp,
      inv_final: pair.inv_final,
      res_temp: pair.res_temp,
      pair_state: pair.pair_state,
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

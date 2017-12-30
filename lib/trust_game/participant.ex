defmodule TrustGame.Participant do
  alias TrustGame.Actions

  def filter_data(data, id) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    rule = %{
      pair_results: true,
      question: true,
      dynamic_text: true,
      game_page: true,
      game_round: true,
      game_point: true,
      game_rate: true,
      game_progress: true,
      participants: %{id => true},
      pairs: %{pair_id => %{
        members: true,
        pair_round: true,
        inv_temp: true,
        inv_final: true,
        res_temp: true,
        pair_state: true
      }},
      trust_results: data.game_page == "result",
      _spread: [[:participants, id], [:pairs, pair_id]]
    }
    data
    |> Transmap.transform(rule)
    |> Map.put(:participants_length, Map.size(data.participants))
    |> Map.put(:id, id)
  end

  require Logger
  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def sync_inv_temp(data, id, inv_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    target_id = getTargetId(data, id)
    if "investing" == get_in(data, [:pairs, pair_id, :pair_state]) do
      put_in(data, [:pairs, pair_id, :inv_temp], inv_temp)
    else
      data
    end
  end

  def finish_investing(data, id, inv_final) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    target_id = getTargetId(data, id)
    if "investing" == get_in(data, [:pairs, pair_id, :pair_state]) do
      put_in(data, [:pairs, pair_id, :pair_state], "responding")
      |> put_in([:pairs, pair_id, :inv_final], inv_final)
    else
      data
    end
  end

  def sync_res_temp(data, id, res_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    target_id = getTargetId(data, id)
    if "responding" == get_in(data, [:pairs, pair_id, :pair_state]) do
      put_in(data, [:pairs, pair_id, :res_temp], res_temp)
    else
      data
    end
  end

  def finish_responding(data, id, res_final) do
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
      put_in(data, [:pairs, pair_id, :pair_round], getNextPairRound(data, pair_id))
      |> put_in([:participants, id, :role], getNextRole(get_in(data, [:participants, id, :role])))
      |> put_in([:participants, target_id, :ret], res_final)
      |> put_in([:participants, target_id, :role], getNextRole(get_in(data, [:participants, target_id, :role])))
      |> put_in([:participants, id, :point], # id = Responder
        inv_final*game_rate - res_final + get_in(data, [:participants, id, :point]))
      |> put_in([:participants, target_id, :point], # target_id = Investor
        game_point - inv_final + res_final + get_in(data, [:participants, target_id, :point]))
      |> put_in([:trust_results], Map.merge(get_in(data, [:trust_results]), %{
        Integer.to_string(pair_round) => Map.merge(get_in(data, [:trust_results,
           Integer.to_string(pair_round)]) || %{}, %{
          pair_id => %{
            hold:   inv_final*game_rate - res_final,
            return: res_final,
          }
        })
      }))
      |> put_in([:pairs, pair_id, :pair_state], next_state)
      |> put_in([:pairs, pair_id, :inv_temp], 0)
      |> put_in([:pairs, pair_id, :res_temp], 0)
      |> update_in([:pairs, pair_id, :pair_results], fn list ->
        [%{investor: target_id, inv: inv_final, res: res_final} | list]
      end)
    else
      data
    end
    |> compute_game_progress
  end

  defp compute_game_progress(data) do
    size = Map.size(data.pairs)
    finished = Enum.count(data.pairs, fn {_id, %{pair_state: state}} -> state == "finished" end)
    Map.put(data, :game_progress, round(100 * finished / size))
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
      true -> pair_round + 1
      false -> pair_round
    end
  end
end

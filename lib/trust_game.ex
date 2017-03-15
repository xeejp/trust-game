defmodule TrustGame do
  use XeeThemeScript
  require Logger

  alias TrustGame.Host
  alias TrustGame.Participant
  alias TrustGame.Main
  alias TrustGame.Actions

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{data: %{
        game_page: "waiting",
        game_round: 1,
        game_point: 10,
        game_rate: 3,
        game_progress: 0,
        participants: %{},
        pairs: %{},
        trust_results: %{},
      }
    }}
  end

  def join(data, id) do
    result = unless Map.has_key?(data.participants, id) do
      new = Main.new_participant()
      put_in(data, [:participants, id], new)
    else
      data
    end
    wrap_result(data, result)
  end

  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    Logger.debug("[Trust Game] #{action} #{inspect params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Host.fetch_contents(data)
      {"SHOW_RESULTS", results} -> Host.show_results(data, results)
      {"MATCH", _} -> Host.match(data)
      {"RESET", _} -> Host.reset(data)
      {"CHANGE_PAGE", page} -> Host.change_page(data, page)
      {"CHANGE_GAME_ROUND", game_round} -> Host.change_game_round(data, game_round)
      {"CHANGE_GAME_POINT", game_point} -> Host.change_game_point(data, game_point)
      {"CHANGE_GAME_RATE", game_rate} -> Host.change_game_rate(data, game_rate)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
    Logger.debug("[Trust Game] #{action} #{inspect params}")
    result = case {action, params} do
      {"SYNC_INV_TEMP", inv_temp} -> Participant.sync_inv_temp(data, id, inv_temp)
      {"SYNC_RES_TEMP", res_temp} -> Participant.sync_res_temp(data, id, res_temp)
      {"FETCH_CONTENTS", _} -> Participant.fetch_contents(data, id)
      {"FINISH_INVESTING", inv_final} -> Participant.finish_investing(data, id, inv_final)
      {"FINISH_RESPONDING", res_final} -> Participant.finish_responding(data, id, res_final)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  def compute_diff(old, %{data: new} = result) do
    import Participant, only: [filter_data: 2]
    import Host, only: [filter_data: 1]
    host = Map.get(result, :host, %{})
    participant = Map.get(result, :participant, %{})
    participant_tasks = Enum.map(old.participants, fn {id, _} ->
      {id, Task.async(fn -> JsonDiffEx.diff(filter_data(old, id), filter_data(new, id)) end)}
    end)
    host_task = Task.async(fn -> JsonDiffEx.diff(filter_data(old), filter_data(new)) end)
    host_diff = Task.await(host_task)
    participant_diff = Enum.map(participant_tasks, fn {id, task} -> {id, %{diff: Task.await(task)}} end)
                        |> Enum.filter(fn {_, map} -> map_size(map.diff) != 0 end)
                        |> Enum.into(%{})
    host = Map.merge(host, %{diff: host_diff})
    host = if map_size(host.diff) == 0 do
      Map.delete(host, :diff)
    else
      host
    end
    host = if map_size(host) == 0 do
      nil
    else
      host
    end
    participant = Map.merge(participant, participant_diff, fn _k, v1, v2 ->
      Map.merge(v1, v2)
    end)
    %{data: new, host: host, participant: participant}
  end

  def wrap_result(old, {:ok, result}) do
    {:ok, compute_diff(old, result)}
  end

  def wrap_result(old, new) do
    {:ok, compute_diff(old, %{data: new})}
  end
end

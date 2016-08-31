defmodule DictaorGame.Host do
  alias DictaorGame.Main
  alias DictaorGame.Actions

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def reset(data) do
    %{data |
      participants: data.participants
                    |> Enum.map(fn({id, state}) ->
                      {id, %{
                        role: "visitor",
                        point: 0,
                        pair_id: nil,
                      }}
                    end)
                    |> Enum.into(%{}),
      pairs: %{},
      dictator_results: %{},
      game_round: 1,
    }
    |> Actions.reseted()
  end

  def sync_game_progress(data, game_progress) do
    Actions.sync_game_progress(data, game_progress)
  end

  def sync_participants_length(data, participants_length) do
    Actions.sync_participants_length(data, participants_length)
  end

  def show_results(data, results) do
    put_in(data, [:dictator_results],
      get_in(results, ["dictator_results"])
    )
    |> Actions.show_results(results)
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end

  def change_game_round(data, game_round) do
    if game_round < 0 do game_round = 1 end
    %{data | game_round: game_round}
    |> Actions.change_game_round(game_round)
  end

  def match(data) do
    %{participants: participants} = data
    participants = participants
                    |> Enum.map(fn({id, state}) ->
                      {id, %{
                        role: "visitor",
                        point: 0,
                        pair_id: nil,
                      }}
                    end)
                    |> Enum.into(%{})
    group_size = 2
    groups = participants
              |> Enum.map(&elem(&1, 0)) # [id...]
              |> Enum.shuffle
              |> Enum.chunk(group_size)
              |> Enum.map_reduce(1, fn(p, acc) -> {{Integer.to_string(acc), p}, acc + 1} end) |> elem(0) # [{0, p0}, ..., {n-1, pn-1}]
              |> Enum.into(%{})

    updater = fn participant, pair_id, role ->
      %{ participant |
        role: role,
        point: 0,
        pair_id: pair_id
      }
    end
    reducer = fn {group, ids}, {participants, pairs} ->
      [id1, id2] = ids
      participants = participants
                      |> Map.update!(id1, &updater.(&1, group, "dictator"))
                      |> Map.update!(id2, &updater.(&1, group, "responder"))

      pairs = Map.put(pairs, group, Main.new_pair(ids))
      {participants, pairs}
    end
    acc = {participants, %{}}
    {participants, groups} = Enum.reduce(groups, acc, reducer)

    %{data | participants: participants, pairs: groups}
    |> Actions.matched()
  end
  
  def format_contents(data) do
    data
  end
end

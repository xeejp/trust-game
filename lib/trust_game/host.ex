defmodule TrustGame.Host do
  alias TrustGame.Main
  alias TrustGame.Actions

  def filter_data(data) do
    data
  end

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def reset(data) do
    %{data |
      game_page: "waiting",
      game_round: 1,
      game_point: 10,
      game_rate: 3,
      participants: data.participants
                    |> Enum.map(fn({id, state}) ->
                      {id, %{ state |
                        role: "visitor",
                        point: 0,
                        pair_id: nil,
                      }}
                    end)
                    |> Enum.into(%{}),
      pairs: %{},
      trust_results: %{},
    }
  end

  def change_page(data, game_page) do
    if game_page in Main.pages do
      %{data | game_page: game_page}
    else
      data
    end
  end

  def change_game_round(data, game_round) do
    if game_round < 0 do game_round = 1 end
    %{data | game_round: game_round}
  end

  def change_game_point(data, game_point) do
    if game_point < 0 do game_point = 1 end
    %{data | game_point: game_point}
  end

  def change_game_rate(data, game_rate) do
    if game_rate < 0 do game_rate = 1 end
    %{data | game_rate: game_rate}
  end

  def change_game_question(data, text) do
    %{data | question: text}
  end

  def match(data) do
    %{participants: participants} = data
    participants = participants
                    |> Enum.map(fn({id, state}) ->
                      {id, %{ state |
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
              |> Enum.map_reduce(0, fn(p, acc) -> {{Integer.to_string(acc), p}, acc + 1} end) |> elem(0) # [{0, p0}, ..., {n-1, pn-1}]
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
                      |> Map.update!(id1, &updater.(&1, group, "investor"))
                      |> Map.update!(id2, &updater.(&1, group, "responder"))

      pairs = Map.put(pairs, group, Main.new_pair(ids))
      {participants, pairs}
    end
    acc = {participants, %{}}
    {participants, groups} = Enum.reduce(groups, acc, reducer)

    %{data | participants: participants, pairs: groups}
  end
end

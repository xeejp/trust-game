defmodule DictaorGame.Main do

  @pages ["waiting", "description", "experiment", "result"]
  @roles ["visitor", "dictator", "responder"]
  @states ["allocating", "judging", "finished"]

  def pages, do: @pages
  def roles, do: @roles
  def states, do: @states

  def wrap(data) do
    {:ok, %{"data" => data}}
  end

  def initial do
  end

  def new_participant do
    %{
      point: 0,
      role: "visitor",
      pair_id: nil,
    }
  end

  def new_pair(members) do
    %{
      members: members,
      now_round: 1,
      allo_temp: Enum.random(0..10) * 100,
      state: "allocating",
    }
  end
end

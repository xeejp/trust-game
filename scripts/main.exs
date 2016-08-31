defmodule TrustGame.Main do

  @pages ["waiting", "description", "experiment", "result"]
  @roles ["visitor", "investor", "responder"]
  @states ["investing", "responding", "finished"]

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
      pair_round: 1,
      inv_temp: 0,
      inv_final: nil,
      res_temp: 0,
      res_final: nil,
      pair_state: "investing",
    }
  end
end

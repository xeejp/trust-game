defmodule TrustGame.Actions do
  alias TrustGame.Participant
  alias TrustGame.Host

  require Logger
  def update_host_contents(data) do
    host = get_action("update contents", Host.filter_data(data))
    format(data, host)
  end

  def update_participant_contents(data, id) do
    participant = dispatch_to(id, get_action("update contents", Participant.filter_data(data, id)))
    format(data, nil, participant)
  end

  # Utilities

  def get_action(type, params) do
    %{
      type: type,
      payload: params
    }
  end

  def dispatch_to(map \\ %{}, id, action) do
    Map.put(map, id, %{action: action})
  end

  def dispatch_to_all(%{participants: participants}, action) do
    Enum.reduce(participants, %{}, fn {id, _}, acc -> dispatch_to(acc, id, action) end)
  end

  def format(data, host, participants \\ nil) do
    result = %{data: data}
    unless is_nil(host) do
      result = Map.put(result, :host, %{action: host})
    end
    unless is_nil(participants) do
      result = Map.put(result, :participant, participants)
    end
    {:ok, result}
  end
end

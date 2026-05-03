using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;

namespace BattleHub;

public class BattleHubSignalR : Hub
{
    // Shared in-memory room store — rooms auto-expire after 6 hours
    private static readonly ConcurrentDictionary<string, RoomState> Rooms = new();

    // ── Room management ────────────────────────────────────────────────────

    public async Task<object> CreateRoom(string playerName, string faction)
    {
        var code = GenerateCode();
        var room = new RoomState { Code = code };
        room.ConnectionIds[0] = Context.ConnectionId;
        room.PlayerNames[0] = playerName;
        room.Factions[0] = faction;
        Rooms[code] = room;

        await Groups.AddToGroupAsync(Context.ConnectionId, code);
        return new { code, playerIndex = 0 };
    }

    public async Task<object> JoinRoom(string code, string playerName, string faction)
    {
        code = code.Trim().ToUpper();
        if (!Rooms.TryGetValue(code, out var room))
            return new { success = false, error = "Room not found" };

        if (room.ConnectionIds[1] != null)
            return new { success = false, error = "Room is full" };

        room.ConnectionIds[1] = Context.ConnectionId;
        room.PlayerNames[1] = playerName;
        room.Factions[1] = faction;

        await Groups.AddToGroupAsync(Context.ConnectionId, code);

        // Notify host that opponent joined
        await Clients.Group(code).SendAsync("OpponentJoined", new
        {
            playerName,
            faction,
            room = RoomSnapshot(room)
        });

        return new { success = true, playerIndex = 1, room = RoomSnapshot(room) };
    }

    // ── Phase sync ─────────────────────────────────────────────────────────

    public async Task AdvancePhase(string code, int phaseIdx)
    {
        if (!Rooms.TryGetValue(code, out var room)) return;
        room.Phase = phaseIdx;
        await Clients.OthersInGroup(code).SendAsync("PhaseChanged", phaseIdx);
    }

    public async Task AdvanceTurn(string code)
    {
        if (!Rooms.TryGetValue(code, out var room)) return;
        room.Turn++;
        room.Phase = 0;
        await Clients.Group(code).SendAsync("TurnAdvanced", room.Turn);
    }

    // ── CP sync ────────────────────────────────────────────────────────────

    public async Task UpdateCp(string code, int playerIndex, int newCp)
    {
        if (!Rooms.TryGetValue(code, out var room)) return;
        if (playerIndex is < 0 or > 1) return;
        room.Cp[playerIndex] = Math.Max(0, newCp);
        await Clients.OthersInGroup(code).SendAsync("CpUpdated", playerIndex, room.Cp[playerIndex]);
    }

    // ── Stratagem alerts ───────────────────────────────────────────────────

    public async Task UseStratagem(string code, int playerIndex, string stratagemId, string stratagemName, int cost, string phase, string effect)
    {
        if (!Rooms.TryGetValue(code, out var room)) return;
        room.Cp[playerIndex] = Math.Max(0, room.Cp[playerIndex] - cost);
        room.StratagemLog.Add($"T{room.Turn} P{playerIndex + 1}: {stratagemName} (-{cost}CP)");

        // Opponent sees full stratagem details — key for new player education
        await Clients.OthersInGroup(code).SendAsync("OpponentUsedStratagem", new
        {
            playerIndex,
            stratagemId,
            stratagemName,
            cost,
            phase,
            effect,
            opponentCpRemaining = room.Cp[playerIndex]
        });
    }

    // ── Unit wounds sync ───────────────────────────────────────────────────

    public async Task UpdateUnitWounds(string code, string unitId, int currentWounds)
    {
        if (!Rooms.TryGetValue(code, out var room)) return;
        await Clients.OthersInGroup(code).SendAsync("UnitWoundsUpdated", unitId, currentWounds);
    }

    // ── Reaction window alerts ─────────────────────────────────────────────

    // Call this when declaring a charge — opponent's app can surface overwatch prompts
    public async Task DeclareCharge(string code, string unitName)
    {
        await Clients.OthersInGroup(code).SendAsync("ChargeDeClared", unitName);
    }

    // ── Simple ping / ready signal ─────────────────────────────────────────

    public async Task SendPing(string code, string message)
    {
        await Clients.OthersInGroup(code).SendAsync("PingReceived", message);
    }

    public async Task ConfirmPhaseReady(string code)
    {
        await Clients.OthersInGroup(code).SendAsync("OpponentPhaseReady");
    }

    // ── Disconnect handling ────────────────────────────────────────────────

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        foreach (var (code, room) in Rooms)
        {
            if (room.ConnectionIds[0] == Context.ConnectionId ||
                room.ConnectionIds[1] == Context.ConnectionId)
            {
                await Clients.Group(code).SendAsync("OpponentDisconnected");

                // Expire rooms older than 6 hours
                if ((DateTime.UtcNow - room.CreatedAt).TotalHours > 6)
                    Rooms.TryRemove(code, out _);
            }
        }
        await base.OnDisconnectedAsync(exception);
    }

    // ── Helpers ────────────────────────────────────────────────────────────

    private static string GenerateCode()
    {
        // 4-letter codes are easier to type than numbers on mobile
        const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // no I/O confusion
        return new string(Enumerable.Range(0, 4)
            .Select(_ => chars[Random.Shared.Next(chars.Length)])
            .ToArray());
    }

    private static object RoomSnapshot(RoomState room) => new
    {
        code = room.Code,
        playerNames = room.PlayerNames,
        factions = room.Factions,
        phase = room.Phase,
        cp = room.Cp,
        turn = room.Turn,
    };
}

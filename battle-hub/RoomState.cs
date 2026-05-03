namespace BattleHub;

public class RoomState
{
    public string Code { get; set; } = "";
    public string?[] ConnectionIds { get; set; } = new string?[2];
    public string?[] PlayerNames { get; set; } = new string?[2];
    public string?[] Factions { get; set; } = new string?[2];
    public int Phase { get; set; } = 0;
    public int[] Cp { get; set; } = [6, 6];
    public int Turn { get; set; } = 1;
    public List<string> StratagemLog { get; set; } = [];
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int PlayerIndex(string connectionId) =>
        ConnectionIds[0] == connectionId ? 0 :
        ConnectionIds[1] == connectionId ? 1 : -1;
}

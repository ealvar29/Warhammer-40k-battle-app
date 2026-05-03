using BattleHub;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

// Allow any origin — no auth/cookies in this app, just room codes.
// SetIsOriginAllowed(_ => true) is required to combine AllowCredentials() with open origins,
// because SignalR's negotiate endpoint requests credentials.
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()));

var app = builder.Build();

app.UseCors();

app.MapHub<BattleHubSignalR>("/battlehub");

// Health check — Railway uses this to confirm the app is running
app.MapGet("/health", () => Results.Ok(new { status = "ok", utc = DateTime.UtcNow }));

app.Run();

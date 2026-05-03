using BattleHub;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

// CORS — update ALLOWED_ORIGINS env var in Railway dashboard with your Netlify URL
var allowedOrigins = (builder.Configuration["ALLOWED_ORIGINS"] ?? "http://localhost:5173")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()));

var app = builder.Build();

app.UseCors();

app.MapHub<BattleHubSignalR>("/battlehub");

// Health check — Railway uses this to confirm the app is running
app.MapGet("/health", () => Results.Ok(new { status = "ok", utc = DateTime.UtcNow }));

app.Run();

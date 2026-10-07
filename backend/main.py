from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api import get_player_game_log
from src.analytics import calculate_season_stats
from backend.market import build_player_market
from nba_api.stats.static import players as nba_players

app = FastAPI(title="NBA Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "NBA Analytics API is running"}

@app.get("/players/{player_id}/seasons/{season}")
def get_player_stats(player_id: int, season: str):
    df = get_player_game_log(player_id, season)
    stats = calculate_season_stats(df)
    return {
        "player_id": player_id,
        "season": season,
        "stats": {
            key: float(value)
            for key, value in stats.items()
        }
    }

@app.get("/market")
def get_player_market():
    """Return the current player investment market and backend-derived aggregate metrics."""
    market = build_player_market()

    # The individual value_gap values are produced by the existing valuation
    # utility. The aggregate is calculated here so React does not duplicate
    # valuation logic or become a second source of truth.
    avg_value_gap = float(market["value_gap"].mean()) if not market.empty else 0.0

    return {
        "players": market.to_dict(orient="records"),
        "avg_value_gap": round(avg_value_gap, 2),
    }


@app.get("/player-headshots")
def get_player_headshots():
    """Return official NBA CDN headshot URLs keyed by player full name."""
    return {
        player["full_name"]: f"https://cdn.nba.com/headshots/nba/latest/1040x760/{player['id']}.png"
        for player in nba_players.get_players()
        if player.get("full_name") and player.get("id")
    }

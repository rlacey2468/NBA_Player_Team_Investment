from src.api import get_player_game_log
from src.analytics import calculate_season_stats


df = get_player_game_log("2544", "2024-25")

stats = calculate_season_stats(df)

print(stats)
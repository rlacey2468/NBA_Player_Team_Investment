from nba_api.stats.endpoints import playergamelog

# Gets an individual players stats during a season
def get_player_game_log(player_id, season):
    gamelog = playergamelog.PlayerGameLog(
        player_id=str(player_id),
        season=season
    )

    return gamelog.get_data_frames()[0]

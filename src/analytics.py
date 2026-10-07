# calculates the indivudial player average season stats 
def calculate_season_stats(df):
    stats = {
        "Games": len(df),
        "PPG": df["PTS"].mean(),
        "RPG": df["REB"].mean(),
        "APG": df["AST"].mean(),
        "SPG": df["STL"].mean(),
        "BPG": df["BLK"].mean(),
        "FG%": df["FG_PCT"].mean(),
        "3P%": df["FG3_PCT"].mean(),
        "FT%": df["FT_PCT"].mean(),
        "MPG": df["MIN"].mean(),
        "Plus/Minus": df["PLUS_MINUS"].mean()
    }

    return stats
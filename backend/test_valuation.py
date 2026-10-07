import pandas as pd

from backend.models import PlayerAsset
from backend.valuation import evaluate_player


DATA_FILE = "data/processed/player_data.csv"


def load_player(player_name: str, year: int) -> PlayerAsset:
    df = pd.read_csv(DATA_FILE)

    row = df[
        (df["Player"] == player_name) &
        (df["Year"] == year)
    ].iloc[0]

    return PlayerAsset(
        player_id=0,
        name=row["Player"],
        team=row["Team"],
        position=row["Pos"],
        age=float(row["Age"]),
        year=int(row["Year"]),
        
        salary=float(row["Salary"]),
        contract_years=1,

        games_played=int(row["G"]),
        games_started=int(row["GS"]),
        minutes=float(row["MP"]),

        field_goal_pct=float(row["FG%"]),
        three_point_pct=float(row["3P%"]),
        free_throw_pct=float(row["FT%"]),
        effective_field_goal_pct=float(row["eFG%"]),

        offensive_rebounds=float(row["ORB"]),
        defensive_rebounds=float(row["DRB"]),
        rebounds=float(row["TRB"]),

        assists=float(row["AST"]),
        steals=float(row["STL"]),
        blocks=float(row["BLK"]),
        turnovers=float(row["TOV"]),
        points=float(row["PTS"]),
    )


def main():
    lebron = load_player("LeBron James", 2025)

    result = evaluate_player(lebron)

    print("\nPlayer Valuation")
    print("-" * 40)

    for key, value in result.items():
        print(f"{key}: {value}")


if __name__ == "__main__":
    main()
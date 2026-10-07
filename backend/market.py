import pandas as pd

from backend.models import PlayerAsset
from backend.valuation import evaluate_player


DATA_FILE = "data/processed/player_data.csv"


def row_to_player(row: pd.Series) -> PlayerAsset:
    """Convert a dataset row into a PlayerAsset."""

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


def load_latest_players() -> pd.DataFrame:
    """Load the most recent meaningful season for each player."""

    df = pd.read_csv(DATA_FILE)

    # Only use recent seasons for the active player market.
    df = df[df["Year"] >= 2020]

    # Sort newest season first.
    df = df.sort_values(
        ["Player", "Year"],
        ascending=[True, False]
    )

    # Keep the latest available season for each player.
    df = df.drop_duplicates(
        subset=["Player"],
        keep="first"
    )

    # Ignore extremely small historical contracts.
    df = df[df["Salary"] >= 1.0]

    return df


def build_player_market() -> pd.DataFrame:
    """Evaluate every player's latest available season."""

    df = load_latest_players()

    results = []

    for _, row in df.iterrows():

        try:
            player = row_to_player(row)

            valuation = evaluate_player(player)

            results.append({
                "player": player.name,
                "team": player.team,
                "position": player.position,
                "age": player.age,
                "salary": player.salary,
                "fair_value": valuation["fair_value"],
                "quality_score": valuation["quality_score"],
                "value_gap": valuation["value_gap"],
                "risk": valuation["risk"],
                "risk_adjusted_value": valuation["risk_adjusted_value"],
                "rating": valuation["rating"],
            })

        except (ValueError, TypeError):
            # Skip incomplete player records
            continue

    market = pd.DataFrame(results)

    # Highest risk-adjusted opportunities first
    market = market.sort_values(
    "risk_adjusted_value",
    ascending=False
    )

    return market


def save_market() -> None:
    """Generate and save the player market."""

    market = build_player_market()

    output_file = "data/processed/player_market.csv"

    market.to_csv(output_file, index=False)

    print(f"Players evaluated: {len(market)}")
    print(f"Saved market to: {output_file}")

    print("\nTop 20 Investment Opportunities")
    print("-" * 80)

    print(
        market[
            [
                "player",
                "team",
                "salary",
                "fair_value",
                "quality_score",
                "value_gap",
                "risk",
                "risk_adjusted_value",
                "rating",
            ]
        ]
        .head(20)
        .to_string(index=False)
    )


if __name__ == "__main__":
    save_market()
import pandas as pd


RAW_FILE = "data/raw/NBA Player Stats and Salaries_2000-2025.csv"
PROCESSED_FILE = "data/processed/player_data.csv"


def load_data() -> pd.DataFrame:
    """Load the raw NBA salary and performance dataset."""
    return pd.read_csv(RAW_FILE)


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Clean and standardize the player dataset."""

    df = df.copy()

    # Remove rows without salary or player name
    df = df.dropna(subset=["Player", "Salary"])

    # Standardize column names
    df.columns = [column.strip() for column in df.columns]

    # Convert salary to millions for easier interpretation
    df["Salary"] = df["Salary"] / 1_000_000

    # Remove duplicate player-season records
    df = df.drop_duplicates(subset=["Player", "Year"])

    # Keep only reasonable salary values
    df = df[df["Salary"] > 0]

    return df


def select_features(df: pd.DataFrame) -> pd.DataFrame:
    """Select features used by the valuation model."""

    features = [
        "Player",
        "Year",
        "Pos",
        "Age",
        "Team",
        "G",
        "GS",
        "MP",
        "FG%",
        "3P%",
        "FT%",
        "eFG%",
        "ORB",
        "DRB",
        "TRB",
        "AST",
        "STL",
        "BLK",
        "TOV",
        "PTS",
        "Salary",
    ]

    return df[features]


def save_processed_data(df: pd.DataFrame) -> None:
    """Save cleaned data for model training."""

    df.to_csv(PROCESSED_FILE, index=False)


def main():
    df = load_data()

    print(f"Raw records: {len(df)}")

    df = clean_data(df)

    print(f"After cleaning: {len(df)}")

    df = select_features(df)

    save_processed_data(df)

    print(f"Saved processed data to: {PROCESSED_FILE}")


if __name__ == "__main__":
    main()
import joblib
import pandas as pd

from backend.models import PlayerAsset
from backend.salary_cap import get_salary_cap


MODEL_FILE = "backend/player_valuation_model.joblib"

model = joblib.load(MODEL_FILE)


def player_to_features(player: PlayerAsset) -> pd.DataFrame:
    """Convert a PlayerAsset into ML model features."""

    return pd.DataFrame(
        [
            {
                "Year": player.year,
                "Age": player.age,
                "G": player.games_played,
                "GS": player.games_started,
                "MP": player.minutes,
                "FG%": player.field_goal_pct,
                "3P%": player.three_point_pct,
                "FT%": player.free_throw_pct,
                "eFG%": player.effective_field_goal_pct,
                "ORB": player.offensive_rebounds,
                "DRB": player.defensive_rebounds,
                "TRB": player.rebounds,
                "AST": player.assists,
                "STL": player.steals,
                "BLK": player.blocks,
                "TOV": player.turnovers,
                "PTS": player.points,
                "Pos": player.position,
            }
        ]
    )


def calculate_fair_value(player: PlayerAsset) -> float:
    """Predict fair value as a percentage of the salary cap."""

    features = player_to_features(player)

    predicted_cap_pct = model.predict(features)[0]

    salary_cap = get_salary_cap(player.year)

    fair_value = predicted_cap_pct * salary_cap

    return round(float(fair_value), 2)


def calculate_value_gap(player: PlayerAsset) -> float:
    """
    Calculate the difference between contract cost
    and estimated fair value as a percentage of fair value.
    """

    fair_value = calculate_fair_value(player)

    if fair_value <= 0:
        return 0.0

    value_gap = (
        (fair_value - player.salary)
        / fair_value
    ) * 100

    return round(value_gap, 2)


def calculate_risk(player: PlayerAsset) -> float:
    """Estimate investment risk on a 0-100 scale."""

    risk = 0.0

    availability = player.availability

    if availability < 0.90:
        risk += 20

    if availability < 0.75:
        risk += 20

    if player.age >= 30:
        risk += 10

    if player.age >= 33:
        risk += 15

    if player.contract_years >= 4:
        risk += 10

    return min(round(risk, 2), 100.0)


def calculate_risk_adjusted_value(player: PlayerAsset) -> float:
    """Adjust value gap based on investment risk."""

    value_gap = calculate_value_gap(player)
    risk = calculate_risk(player)

    adjustment = 1 - (risk / 100)

    return round(value_gap * adjustment, 2)

def evaluate_player(player: PlayerAsset) -> dict:
    """Generate the player's complete financial profile."""

    fair_value = calculate_fair_value(player)
    value_gap = calculate_value_gap(player)
    risk = calculate_risk(player)
    risk_adjusted_value = calculate_risk_adjusted_value(player)
    quality_score = calculate_quality_score(player)

    rating = get_investment_rating(
    value_gap=value_gap,
    risk_adjusted_value=risk_adjusted_value,
    )

    return {
        "player": player.name,
        "team": player.team,
        "salary": player.salary,
        "fair_value": fair_value,
        "value_gap": value_gap,
        "risk": risk,
        "risk_adjusted_value": risk_adjusted_value,
        "rating": rating,
        "quality_score": quality_score,
    }

def get_investment_rating(
    value_gap: float,
    risk_adjusted_value: float,
) -> str:

    if risk_adjusted_value >= 30:
        return "STRONG BUY"

    if risk_adjusted_value >= 15:
        return "BUY"

    if risk_adjusted_value >= 0:
        return "HOLD"

    if risk_adjusted_value >= -20:
        return "CAUTION"

    return "SELL"

def calculate_quality_score(player: PlayerAsset) -> float:
    """
    Estimate overall player quality on a 0-100 scale.

    Missing statistics are treated as zero for the composite score.
    """

    def safe(value):
        if value is None:
            return 0.0

        try:
            if pd.isna(value):
                return 0.0
        except TypeError:
            pass

        return float(value)

    points = safe(player.points)
    assists = safe(player.assists)
    rebounds = safe(player.rebounds)
    field_goal_pct = safe(player.field_goal_pct)
    three_point_pct = safe(player.three_point_pct)
    steals = safe(player.steals)
    blocks = safe(player.blocks)

    scoring = min(points / 30, 1.0) * 25
    playmaking = min(assists / 10, 1.0) * 15
    rebounding = min(rebounds / 12, 1.0) * 10

    efficiency = (
        min(field_goal_pct / 0.60, 1.0) * 10
        + min(three_point_pct / 0.40, 1.0) * 10
    )

    defense = (
        min(steals / 2.0, 1.0) * 5
        + min(blocks / 2.0, 1.0) * 5
    )

    availability = min(player.availability, 1.0) * 20

    score = (
        scoring
        + playmaking
        + rebounding
        + efficiency
        + defense
        + availability
    )

    return round(min(score, 100.0), 2)
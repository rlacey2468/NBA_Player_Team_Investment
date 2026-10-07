from dataclasses import dataclass
from typing import List


@dataclass
class PlayerAsset:
    player_id: int
    name: str
    team: str
    position: str
    age: float
    year: int

    # Financial
    salary: float
    contract_years: int

    # Performance
    games_played: int
    games_started: int
    minutes: float

    field_goal_pct: float
    three_point_pct: float
    free_throw_pct: float
    effective_field_goal_pct: float

    offensive_rebounds: float
    defensive_rebounds: float
    rebounds: float

    assists: float
    steals: float
    blocks: float
    turnovers: float
    points: float

    @property
    def availability(self) -> float:
        """
        Percentage of games played.
        """

        # We don't know games possible from the player itself,
        # so we'll use 82 as the standard regular season.
        return self.games_played / 82
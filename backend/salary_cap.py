SALARY_CAP = {
    2000: 34.0,
    2001: 42.5,
    2002: 40.3,
    2003: 43.8,
    2004: 43.9,
    2005: 49.5,
    2006: 53.1,
    2007: 55.6,
    2008: 58.7,
    2009: 57.7,
    2010: 58.0,
    2011: 58.0,
    2012: 58.0,
    2013: 58.7,
    2014: 63.1,
    2015: 70.0,
    2016: 94.1,
    2017: 99.1,
    2018: 101.9,
    2019: 109.1,
    2020: 109.1,
    2021: 112.4,
    2022: 123.7,
    2023: 136.0,
    2024: 140.6,
    2025: 154.6,
}


def get_salary_cap(year: int) -> float:
    """Return NBA salary cap for a season year in millions."""

    if year not in SALARY_CAP:
        raise ValueError(f"No salary cap data for year {year}")

    return SALARY_CAP[year]
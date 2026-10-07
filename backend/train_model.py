import pandas as pd
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from backend.salary_cap import get_salary_cap

DATA_FILE = "data/processed/player_data.csv"


FEATURES = [
    "Year",
    "Age",
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
    "Pos",
]

TARGET = "SalaryCapPct"


def load_data():
    df = pd.read_csv(DATA_FILE)

    df["SalaryCap"] = df["Year"].apply(get_salary_cap)

    df["SalaryCapPct"] = df["Salary"] / df["SalaryCap"]

    return df


def split_data(df):
    """
    Split chronologically so the model never trains on future seasons.
    """

    train = df[df["Year"] <= 2022]
    validation = df[df["Year"] == 2023]
    test = df[df["Year"] >= 2024]

    return train, validation, test


def build_model():
    numeric_features = [
        "Year",
        "Age",
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
    ]

    categorical_features = ["Pos"]

    numeric_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )

    categorical_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore")),
        ]
    )

    preprocessing = ColumnTransformer(
        transformers=[
            ("numeric", numeric_pipeline, numeric_features),
            ("categorical", categorical_pipeline, categorical_features),
        ]
    )

    model = Pipeline(
        steps=[
            ("preprocessing", preprocessing),
            ("regression", Ridge(alpha=10.0)),
        ]
    )

    return model


def evaluate(model, X, y, name):
    predictions = model.predict(X)

    mae = mean_absolute_error(y, predictions)
    rmse = mean_squared_error(y, predictions) ** 0.5
    r2 = r2_score(y, predictions)

    print(f"\n{name}")
    print("-" * 40)
    print(f"MAE:  ${mae:.2f}M")
    print(f"RMSE: ${rmse:.2f}M")
    print(f"R²:   {r2:.3f}")

    return predictions


def main():

    df = load_data()

    print(f"Total records: {len(df)}")
    print(f"Years: {df['Year'].min()} - {df['Year'].max()}")

    train, validation, test = split_data(df)

    print(f"\nTraining records:   {len(train)}")
    print(f"Validation records: {len(validation)}")
    print(f"Test records:       {len(test)}")

    model = build_model()

    X_train = train[FEATURES]
    y_train = train[TARGET]

    model.fit(X_train, y_train)

    evaluate(
        model,
        validation[FEATURES],
        validation[TARGET],
        "Validation Results",
    )

    evaluate(
        model,
        test[FEATURES],
        test[TARGET],
        "Test Results",
    )

    joblib.dump(model, "backend/player_valuation_model.joblib")

    print("\nModel saved to backend/player_valuation_model.joblib")


if __name__ == "__main__":
    main()
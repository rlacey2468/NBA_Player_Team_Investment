# NBA Market Intelligence
### Player Valuation & Contract Analytics

NBA Market Intelligence is a full-stack analytics platform that evaluates NBA player contracts using machine learning, historical performance data, and salary-cap-adjusted valuation metrics.

The platform approaches NBA contracts from an investment perspective, identifying players whose estimated fair value differs from their current salary. It combines a machine learning valuation model, a risk assessment engine, a FastAPI backend, and an interactive React dashboard to turn player statistics into actionable market insights.

## Overview

The platform addresses a central question:

**Which NBA players may be undervalued or overvalued relative to their estimated performance-based value?**

Rather than relying exclusively on traditional statistics, the system combines player performance, efficiency, availability, contract information, and historical salary-cap data to evaluate each player's market position.

## Features

- **Player Valuation:** Estimate player fair value using a machine learning model trained on historical NBA salary and performance data.
- **Market Analysis:** Evaluate hundreds of players and rank potential investment opportunities using modeled value gaps and risk-adjusted metrics.
- **Risk Assessment:** Account for factors such as player availability, age, and contract length.
- **Player Research:** Select individual players to explore their valuation metrics, strengths, and risk considerations.
- **Interactive Dashboard:** Explore player market data through a searchable interface, valuation visualizations, market indicators, and player-specific analysis.
- **Investment Signals:** Classify players into STRONG BUY, BUY, HOLD, CAUTION, and SELL categories based on the model's risk-adjusted valuation signal.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite |
| UI & Styling | Tailwind CSS, custom CSS |
| Backend API | Python, FastAPI |
| Data Processing | Pandas, NumPy |
| Machine Learning | Scikit-learn, Ridge Regression |
| Model Persistence | Joblib |
| Data Storage | CSV datasets and processed market data |
| Visualization | Custom SVG-based charts |

## System Architecture

The application separates data processing, model inference, valuation logic, API delivery, and frontend presentation.

```text
Historical NBA Statistics & Salaries
                ↓
       Data Processing
                ↓
    Feature Engineering
                ↓
     Ridge Regression
                ↓
   Player Valuation Model
                ↓
     Valuation & Risk Engine
                ↓
          FastAPI
                ↓
       React Dashboard
                ↓
     Interactive Market Analysis
```

## Machine Learning & Valuation

### Salary-Cap Normalization

NBA salaries vary significantly across seasons as the league's salary cap changes. To make historical salary data more comparable, the model uses salary-cap share:

\[
\text{Salary Cap Share}
=
\frac{\text{Player Salary}}{\text{League Salary Cap}}
\]

The model estimates a player's salary-cap-adjusted value, which is then converted back into a dollar estimate using the applicable historical salary cap.

### Ridge Regression

The valuation model uses Ridge Regression to estimate player value from historical performance and contract-related features.

Ridge Regression introduces regularization, helping control model complexity when input features are correlated. The trained model is saved using Joblib so that it can be loaded for valuation without retraining every time the application runs.

### Value Gap

The platform compares estimated fair value with the player's current salary.

\[
\text{Value Gap (\%)}
=
\frac{\text{Fair Value}-\text{Current Salary}}
{\text{Fair Value}}\times100
\]

A positive value gap indicates that the model's estimated fair value exceeds the current salary. A negative value gap indicates that the current salary exceeds the model's estimate.

These results are model-based estimates, not guarantees of future performance or investment returns.

## Risk & Investment Analysis

The valuation engine incorporates additional metrics to avoid evaluating players on estimated value alone.

- **Quality Score:** Combines scoring, playmaking, rebounding, efficiency, defense, and availability.
- **Risk Score:** Uses availability, age, and contract length to estimate selected sources of player risk.
- **Risk-Adjusted Value:** Adjusts the modeled value signal to account for the system's risk assessment.
- **Investment Rating:** Converts the resulting signal into a standardized category for easier comparison across players.

The quality score weights scoring at 25%, playmaking at 15%, rebounding at 10%, efficiency at 20%, defense at 10%, and availability at 20%.

These indicators are designed to support comparative analysis. They should be interpreted within the limitations of the model and its underlying data.

## Backend & API

The backend is built with FastAPI and separates the application's analytical responsibilities into modular components.

- **Data Pipeline:** Cleans historical player data and prepares model features.
- **Training Pipeline:** Trains and persists the player valuation model.
- **Valuation Engine:** Calculates fair value, value gaps, risk scores, quality scores, and investment ratings.
- **Market Analysis:** Evaluates eligible players and generates processed market results.
- **REST API:** Serves market data to the frontend.

The `/market` endpoint returns player market records and an aggregate market value-gap metric. The frontend consumes this data to populate the dashboard.

## Frontend & Dashboard

The React frontend presents the valuation engine through a finance-inspired NBA market interface.

The dashboard includes:

- Market overview metrics
- A searchable player market table
- Player-specific research and valuation details
- Valuation charts and market signals
- Dynamic strength, risk, and model-signal panels

The interface is designed to make complex analytical results easier to explore. Selecting a player updates the associated research panel and its metrics, connecting the dashboard's visual elements to the underlying market data.

## Engineering Decisions

- **Separation of concerns:** Data preparation, model training, valuation logic, API delivery, and UI rendering are kept in separate modules.
- **Backend-driven calculations:** Valuation and risk calculations are performed in Python rather than duplicated across frontend components.
- **Historical normalization:** Salary-cap share helps account for changes in the NBA's salary environment across seasons.
- **Reusable model inference:** The persisted model can be loaded without running the training pipeline for every request.
- **Data-driven UI:** Player research panels derive their displayed metrics from the selected player's market record.

## Running Locally

### 1. Start the backend

From the project root, activate your Python virtual environment and install the project's dependencies if needed.

```bash
python -m uvicorn backend.main:app --reload
```

The FastAPI server runs at `http://localhost:8000`.

### 2. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite URL printed in the terminal, typically `http://localhost:5173`.

Run both services while using the dashboard.

## Future Development

Potential extensions include incorporating additional seasons of data, expanding contract and performance features, evaluating out-of-sample valuation accuracy, and introducing more advanced player-comparison and portfolio-analysis capabilities.

## Project Goal

NBA Market Intelligence demonstrates how machine learning, data engineering, backend API development, and interactive frontend design can be combined into an end-to-end analytics product.

The project focuses on transforming raw sports data into interpretable valuation metrics and presenting those results through a usable, decision-oriented interface.
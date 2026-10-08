# NBA Market Intelligence

### Player Valuation & Contract Analytics Platform

NBA Market Intelligence is an end-to-end sports analytics application that treats NBA player contracts as financial assets.

The system combines a Python/FastAPI backend, machine learning valuation model, historical NBA salary and performance data, and an interactive React dashboard to answer:

> **Which NBA players provide the most value relative to their current contracts?**

Rather than evaluating players only through traditional statistics, the platform combines **on-court production, efficiency, availability, contract cost, salary-cap context, and risk** to produce a model-driven investment signal.

---

# Project Overview

The application was designed to simulate a data product that could be used by an NBA front office, analytics team, or sports investment analyst.

The system has three primary layers:

```text
                    NBA DATA
                       │
                       ▼
              ┌─────────────────┐
              │ Data Processing  │
              │ & Feature Eng.   │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Machine Learning │
              │ Valuation Model  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Valuation + Risk │
              │     Engine       │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │     FastAPI      │
              │      API         │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ React Frontend   │
              │ Market Dashboard │
              └─────────────────┘
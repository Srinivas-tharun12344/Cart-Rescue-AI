# 🛒 Cart Rescue AI

AI-powered Cart Abandonment Prediction System using Machine Learning and Multi-Agent AI.

## Features

- 🤖 XGBoost-based abandonment prediction
- 🧠 Multi-Agent AI decision engine
- 📊 Real-time analytics dashboard
- 💳 Payment simulation
- 🎁 Personalized intervention recommendations
- 📈 AI Holdout Validation
- 📝 Audit logging
- 🛡️ Policy Guardrails

## Tech Stack

Frontend
- React
- Recharts
- Axios

Backend
- FastAPI
- Python
- Pandas

Machine Learning
- XGBoost
- Scikit-learn

## Architecture

Prediction Form
↓
Risk Agent
↓
Diagnosis Agent
↓
Recommendation Agent
↓
Policy Guardrail
↓
Review Agent
↓
Audit Logger
↓
Dashboard Analytics

## Installation

Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

import csv
import os

from backend.schemas import SessionInput

from backend.agents.risk_agent import get_risk
from backend.agents.diagnosis_agent import diagnose
from backend.agents.decision_agent import recommend
from backend.agents.policy_agent import apply_policy
from backend.agents.audit_agent import log_prediction
from backend.agents.review_agent import review_decision

from backend.dashboard import get_dashboard_data


app = FastAPI(
    title="Cart Rescue AI",
    description="AI-powered Cart Abandonment Prediction API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Cart Rescue AI 🚀"
    }


# ---------------------------------------------------
# Prediction API
# ---------------------------------------------------

@app.post("/predict")
def predict(session: SessionInput):

    data = session.model_dump()

    # Risk Prediction
    risk = get_risk(data)

    # Diagnosis
    reason = diagnose(data)

    # Recommendation
    action = recommend(
        risk["risk_level"],
        reason
    )

    # Policy Guardrail
    policy = apply_policy(
        risk_level=risk["risk_level"],
        action=action,
        coupons_used=0
    )
    review = review_decision(
    risk["risk_level"],
    policy["final_action"]
)

    # Audit Log
    log_prediction(
    risk_score=risk["risk_score"],
    risk_level=risk["risk_level"],
    diagnosis=reason,
    recommendation=review["final_action"],
    policy_decision=review["review_message"],
    payment_status="Pending"
)

    return {
        "risk_score": risk["risk_score"],
        "risk_level": risk["risk_level"],
        "prediction": risk["prediction"],
        "diagnosis": reason,
         "recommended_action": review["final_action"],
    "policy_reason": policy["policy_reason"],
    "review_message": review["review_message"]
    }


# ---------------------------------------------------
# Dashboard
# ---------------------------------------------------

@app.get("/dashboard")
def dashboard():
    return get_dashboard_data()


# ---------------------------------------------------
# Update Audit Log Payment Status
# ---------------------------------------------------

def update_payment_status(status):

    LOG_FILE = "data/logs/audit_logs.csv"

    if not os.path.exists(LOG_FILE):
        return

    df = pd.read_csv(LOG_FILE)

    if df.empty:
        return

    print("Before Update")
    print(df.tail())

    df.loc[df.index[-1], "Payment Status"] = status

    print("After Update")
    print(df.tail())

    df.to_csv(LOG_FILE, index=False)


# ---------------------------------------------------
# Payment API
# ---------------------------------------------------

@app.post("/payment")
def payment(status: str, risk_level: str):

    # Payment Successful
    if status == "success":

        update_payment_status("Success")

        return {
            "status": "success",
            "message": "Order placed successfully."
        }

    # Payment Failed - High Risk
    if risk_level == "High":

        update_payment_status("Failed")

        return {
            "status": "failed",
            "coupon": "SAVE15",
            "discount": "15%",
            "message": "Payment failed.",
            "recommendation": "Offer Coupon"
        }

    # Payment Failed - Medium Risk
    elif risk_level == "Medium":

        update_payment_status("Failed")

        return {
            "status": "failed",
            "coupon": "SAVE5",
            "discount": "5%",
            "message": "Payment failed.",
            "recommendation": "Offer Coupon"
        }

    # Payment Failed - Low Risk
    else:

        update_payment_status("Failed")

        return {
            "status": "failed",
            "coupon": None,
            "discount": "0%",
            "message": "Payment failed.",
            "recommendation": "Retry Payment"
        }
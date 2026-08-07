from fastapi import FastAPI
from backend.schemas import SessionInput

from backend.agents.risk_agent import get_risk
from backend.agents.diagnosis_agent import diagnose
from backend.agents.decision_agent import recommend
from backend.dashboard import get_dashboard_data
from fastapi.middleware.cors import CORSMiddleware

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


@app.post("/predict")
def predict(session: SessionInput):

    # Convert request to dictionary
    data = session.model_dump()

    # Predict Risk
    risk = get_risk(data)

    # Diagnosis
    reason = diagnose(data)

    # Recommendation
    action = recommend(risk["risk_level"], reason)

    return {
        "risk_score": risk["risk_score"],
        "risk_level": risk["risk_level"],
        "prediction": risk["prediction"],
        "diagnosis": reason,
        "recommended_action": action
    }
@app.get("/dashboard")
def dashboard():
    return get_dashboard_data()


# -----------------------------
# Payment API
# -----------------------------
@app.post("/payment")
def payment(status: str, risk_level: str):

    # Payment Successful
    if status == "success":
        return {
            "status": "success",
            "message": "Order placed successfully."
        }

    # Payment Failed - High Risk
    if risk_level == "High":
        return {
            "status": "failed",
            "coupon": "SAVE15",
            "discount": "15%",
            "message": "Payment failed.",
            "recommendation": "Offer Coupon"
        }

    # Payment Failed - Medium Risk
    elif risk_level == "Medium":
        return {
            "status": "failed",
            "coupon": "SAVE5",
            "discount": "5%",
            "message": "Payment failed.",
            "recommendation": "Offer Coupon"
        }

    # Payment Failed - Low Risk
    return {
        "status": "failed",
        "coupon": None,
        "discount": "0%",
        "message": "Payment failed.",
        "recommendation": "Retry Payment"
    }
    
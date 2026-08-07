import joblib
import pandas as pd

# Load trained XGBoost model
model = joblib.load("data/models/cart_model.pkl")


def predict_risk(data):
    """
    Predict cart abandonment risk.
    Only send the 4 features that the XGBoost model was trained on.
    """

    # Create DataFrame using ONLY training features
    features = pd.DataFrame([{
        "page_views": data["page_views"],
        "product_views": data["product_views"],
        "add_to_cart": data["add_to_cart"],
        "session_duration": data["session_duration"]
    }])

    # Probability of abandonment
    probability = float(model.predict_proba(features)[0][1])

    # Prediction
    prediction = int(probability >= 0.5)

    return {
        "risk_score": probability,
        "prediction": prediction
    }
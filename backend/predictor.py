import joblib
import pandas as pd

model = joblib.load("data/models/cart_model.pkl")

def predict_risk(data):

    features = pd.DataFrame([{
        "Page Views": data["page_views"],
        "Product Views": data["product_views"],
        "Add To Cart": data["add_to_cart"],
        "Session Duration": data["session_duration"],
        "age": data["age"],
        "marketing_opt_in": data["marketing_opt_in"],
        "Estimated Delivery Days": data["estimated_delivery_days"],
        "Cash On Delivery": data["cash_on_delivery"],
        "device": data["device"],
        "country": data["country"],
        "source": data["source"]
    }])

    # -----------------------------
    # ML Prediction
    # -----------------------------

    probability = float(model.predict_proba(features)[0][1])

    print("\n========== MODEL OUTPUT ==========")
    print("Raw Probability :", probability)

    # -----------------------------
    # Business Rule Score
    # -----------------------------

    business_score = 0.0

    # Delivery delay
    if data["estimated_delivery_days"] > 5:
        business_score += 0.15

    # COD unavailable
    if data["cash_on_delivery"] == "Unavailable":
        business_score += 0.15

    # Very short session
    if data["session_duration"] < 60:
        business_score += 0.10

    # Customer not opted for marketing
    if not data["marketing_opt_in"]:
        business_score += 0.05

    # Nothing added to cart
    if data["add_to_cart"] == 0:
        business_score += 0.20

    # Browsing a lot but no cart
    if data["page_views"] > 10 and data["add_to_cart"] == 0:
        business_score += 0.10

    # Lots of product views but no purchase intent
    if data["product_views"] > 15 and data["add_to_cart"] < 2:
        business_score += 0.10

    business_score = min(business_score, 1.0)

    print("Business Score :", business_score)

    # -----------------------------
    # Final Score
    # -----------------------------

    score = (0.70 * probability) + (0.30 * business_score)

    score = min(max(score, 0), 1)

    print("Final Score :", score)

    prediction = int(score >= 0.5)

    return {
        "risk_score": score,
        "prediction": prediction
    }
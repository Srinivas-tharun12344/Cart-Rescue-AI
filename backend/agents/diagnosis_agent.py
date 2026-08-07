def diagnose(data):

    reasons = []

    # Delivery
    if data["delivery_days"] > 5:
        reasons.append("Long Delivery Time")

    # COD
    if not data["cod_available"]:
        reasons.append("Cash On Delivery Not Available")

    # Browsing
    if data["add_to_cart"] == 0:
        reasons.append("Browsing Only")

    # Price comparison
    if data["product_views"] >= 5:
        reasons.append("Price Comparison")

    # Low engagement
    if data["page_views"] <= 3 and data["session_duration"] < 120:
        reasons.append("Low Customer Engagement")

    if len(reasons) == 0:
        return "Normal Shopping Behaviour"

    return ", ".join(reasons)
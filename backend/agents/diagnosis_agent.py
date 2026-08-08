def diagnose(data):

    # Long delivery time
    if data["estimated_delivery_days"] > 5:
        return "Long Delivery Time"

    # Cash on Delivery unavailable
    if data["cash_on_delivery"] == "Unavailable":
        return "Cash On Delivery Unavailable"

    # Customer comparing products
    if data["page_views"] > 10 and data["add_to_cart"] == 0:
        return "Price Comparison"

    # Low engagement
    if data["session_duration"] < 60:
        return "Low Customer Engagement"

    # Marketing disabled
    if not data["marketing_opt_in"]:
        return "Customer Not Opted for Marketing"

    return "Normal Shopping Behaviour"
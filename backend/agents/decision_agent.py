def recommend(risk_level, diagnosis):

    if "Cash On Delivery" in diagnosis:
        return "Enable COD or Suggest UPI"

    if "Long Delivery Time" in diagnosis:
        return "Offer Faster Delivery"

    if "Price Comparison" in diagnosis:
        return "Offer 5% Coupon"

    if "Browsing Only" in diagnosis:
        return "Show Similar Products"

    if "Low Customer Engagement" in diagnosis:
        return "Send Personalized Notification"

    if risk_level == "High":
        return "Offer 15% Coupon"

    if risk_level == "Medium":
        return "Offer 5% Coupon"

    return "Proceed To Checkout"
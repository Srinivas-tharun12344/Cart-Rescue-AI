def review_decision(risk_level, recommendation):
    """
    Review the AI recommendation before sending it to the user.
    """

    # Low-risk customers should not receive coupons
    if risk_level == "Low" and "Coupon" in recommendation:
        return {
            "approved": False,
            "final_action": "Retry Payment",
            "review_message": "Coupon rejected for low-risk customer."
        }

    # High-risk customers should not simply proceed to checkout
    if risk_level == "High" and recommendation == "Proceed To Checkout":
        return {
            "approved": False,
            "final_action": "Offer Coupon",
            "review_message": "Checkout recommendation rejected."
        }

    # Otherwise approve
    return {
        "approved": True,
        "final_action": recommendation,
        "review_message": "Decision Approved"
    }
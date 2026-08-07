def apply_guardrail(action, risk_score):

    if action == "Offer 5% Coupon" and risk_score < 0.80:
        return "Do Nothing"

    return action
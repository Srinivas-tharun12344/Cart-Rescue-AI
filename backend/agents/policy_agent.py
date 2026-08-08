# backend/agents/policy_agent.py

from backend.config import (
    DAILY_DISCOUNT_BUDGET,
    USED_DISCOUNT_BUDGET,
    MAX_COUPONS_PER_CUSTOMER,
)

def apply_policy(risk_level, action, coupons_used=0):
    """
    Applies business guardrails before the final recommendation.
    """

    remaining_budget = DAILY_DISCOUNT_BUDGET - USED_DISCOUNT_BUDGET

    # Rule 1: Low-risk customers should not receive coupons
    if risk_level == "Low" and "Coupon" in action:
        return {
            "final_action": "Proceed To Checkout",
            "policy_reason": "Low-risk customer. Coupon not required."
        }

    # Rule 2: Customer has already used too many coupons
    if coupons_used >= MAX_COUPONS_PER_CUSTOMER:
        return {
            "final_action": "Retry Payment",
            "policy_reason": "Coupon limit reached."
        }

    # Rule 3: Discount budget exhausted
    if remaining_budget <= 0 and "Coupon" in action:
        return {
            "final_action": "Retry Payment",
            "policy_reason": "Daily discount budget exhausted."
        }

    # Rule 4: High discount but insufficient budget
    if action == "Offer 15% Coupon" and remaining_budget < 1000:
        return {
            "final_action": "Offer 5% Coupon",
            "policy_reason": "Reduced coupon to save budget."
        }

    # Default
    return {
        "final_action": action,
        "policy_reason": "Approved"
    }
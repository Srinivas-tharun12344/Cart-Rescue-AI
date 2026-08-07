from backend.predictor import predict_risk


def get_risk(data):

    result = predict_risk(data)

    if result["risk_score"] >= 0.75:
        result["risk_level"] = "High"

    elif result["risk_score"] >= 0.40:
        result["risk_level"] = "Medium"

    else:
        result["risk_level"] = "Low"

    return result
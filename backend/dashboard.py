import pandas as pd

# Load processed dataset
df = pd.read_csv("data/processed/session_features.csv")


def get_dashboard_data():

    total_sessions = len(df)

    purchased = int(df["Purchased"].sum())

    abandoned = total_sessions - purchased

    high_risk = abandoned
    low_risk = purchased
    medium_risk = total_sessions - high_risk - low_risk

    return {
        "total_sessions": total_sessions,
        "successful_purchases": purchased,
        "abandoned_carts": abandoned,
        "high_risk": high_risk,
        "medium_risk": medium_risk,
        "low_risk": low_risk,
        "recovery_rate": round((purchased / total_sessions) * 100, 2)
    }
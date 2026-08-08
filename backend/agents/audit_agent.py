import csv
import os
from datetime import datetime

LOG_FILE = "data/logs/audit_logs.csv"

def log_prediction(
    risk_score,
    risk_level,
    diagnosis,
    recommendation,
    policy_decision,
    payment_status="Pending"
):

    os.makedirs("data/logs", exist_ok=True)

    file_exists = os.path.exists(LOG_FILE)

    with open(LOG_FILE, "a", newline="", encoding="utf-8") as file:

        writer = csv.writer(file)

        if not file_exists:
            writer.writerow([
                "Timestamp",
                "Risk Score",
                "Risk Level",
                "Diagnosis",
                "Recommendation",
                "Policy Decision",
                "Payment Status"
            ])

        writer.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            risk_score,
            risk_level,
            diagnosis,
            recommendation,
            policy_decision,
            payment_status
        ])
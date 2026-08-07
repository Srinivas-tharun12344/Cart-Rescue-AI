import json
from datetime import datetime

def log_prediction(result):

    result["timestamp"] = str(datetime.now())

    with open("audit_log.json", "a") as f:
        f.write(json.dumps(result))
        f.write("\n")
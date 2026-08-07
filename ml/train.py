import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
)

from xgboost import XGBClassifier

print("=" * 50)
print("Loading Dataset...")
print("=" * 50)

# Load processed features
df = pd.read_csv("data/processed/session_features.csv")

print(df.head())

# -------------------------
# Remove identifier columns
# -------------------------
drop_cols = []

for col in [
    "UserID",
    "SessionID",
    "Purchased",
    "purchases",      # remove
    "cart_value"      # remove
]:
    if col in df.columns:
        drop_cols.append(col)

X = df.drop(columns=drop_cols)

y = df["Purchased"]

print("\nNumber of Features:", X.shape[1])
print("Number of Samples :", X.shape[0])

# -------------------------
# Train-Test Split
# -------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

print("\nTraining Samples :", len(X_train))
print("Testing Samples  :", len(X_test))

# -------------------------
# Train Model
# -------------------------
print("\nTraining XGBoost Model...")

model = XGBClassifier(
    n_estimators=150,
    max_depth=5,
    learning_rate=0.1,
    random_state=42,
    eval_metric="logloss",
)

model.fit(X_train, y_train)

# -------------------------
# Predictions
# -------------------------
pred = model.predict(X_test)
prob = model.predict_proba(X_test)[:, 1]

print("\nModel Evaluation")
print("=" * 50)

print("Accuracy :", round(accuracy_score(y_test, pred), 4))
print("Precision:", round(precision_score(y_test, pred), 4))
print("Recall   :", round(recall_score(y_test, pred), 4))
print("F1 Score :", round(f1_score(y_test, pred), 4))
print("ROC AUC  :", round(roc_auc_score(y_test, prob), 4))

# -------------------------
# Save Model
# -------------------------
os.makedirs("data/models", exist_ok=True)

joblib.dump(model, "data/models/cart_model.pkl")

print("\n✅ Model Saved Successfully!")
print("Location: data/models/cart_model.pkl")
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import accuracy_score

from xgboost import XGBClassifier

print("Loading processed dataset...")

df = pd.read_csv("data/processed/session_features.csv")

print(df.head())
print("\nDataset Shape:", df.shape)

# -------------------------------------------------
# Create Target (Abandoned = 1, Purchased = 0)
# -------------------------------------------------

df["Abandoned"] = 1 - df["Purchased"]

# -------------------------------------------------
# Target
# -------------------------------------------------

y = df["Abandoned"]

# -------------------------------------------------
# Features
# -------------------------------------------------

X = df[
    [
        "Page Views",
        "Product Views",
        "Add To Cart",
        "Session Duration",
        "age",
        "marketing_opt_in",
        "Estimated Delivery Days",
        "Cash On Delivery",
        "device",
        "country",
        "source",
    ]
]

# -------------------------------------------------
# Categorical Columns
# -------------------------------------------------

categorical = [
    "Cash On Delivery",
    "device",
    "country",
    "source",
]

numeric = [
    "Page Views",
    "Product Views",
    "Add To Cart",
    "Session Duration",
    "age",
    "marketing_opt_in",
    "Estimated Delivery Days",
]

# -------------------------------------------------
# Preprocessing
# -------------------------------------------------

preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical,
        ),
        (
            "num",
            "passthrough",
            numeric,
        ),
    ]
)

# -------------------------------------------------
# Handle Imbalanced Dataset
# -------------------------------------------------

positive = (y == 1).sum()
negative = (y == 0).sum()

scale_pos_weight = negative / positive

print("\nPurchased :", negative)
print("Abandoned :", positive)
print("Scale Pos Weight :", round(scale_pos_weight, 2))

# -------------------------------------------------
# XGBoost Model
# -------------------------------------------------

model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        (
            "classifier",
            XGBClassifier(
                n_estimators=250,
                max_depth=6,
                learning_rate=0.05,
                random_state=42,
                eval_metric="logloss",
                scale_pos_weight=scale_pos_weight,
            ),
        ),
    ]
)

# -------------------------------------------------
# Train/Test Split
# -------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y,
)

print("\nTraining XGBoost Model...")

model.fit(X_train, y_train)

pred = model.predict(X_test)

acc = accuracy_score(y_test, pred)

print("\nAccuracy :", round(acc, 4))

# -------------------------------------------------
# Save Model
# -------------------------------------------------

joblib.dump(model, "data/models/cart_model.pkl")

print("\nModel Saved Successfully!")
print("\nModel saved at data/models/cart_model.pkl")
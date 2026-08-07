import pandas as pd

# Load dataset
df = pd.read_csv("data/raw/ecommerce_clickstream_transactions.csv")

# Convert timestamp
df["Timestamp"] = pd.to_datetime(df["Timestamp"])

# Group by BOTH UserID and SessionID
session_features = df.groupby(["UserID", "SessionID"]).agg(

    page_views=("EventType", lambda x: (x == "page_view").sum()),

    product_views=("EventType", lambda x: (x == "product_view").sum()),

    add_to_cart=("EventType", lambda x: (x == "add_to_cart").sum()),

    purchases=("EventType", lambda x: (x == "purchase").sum()),

    cart_value=("Amount", "sum"),

    session_start=("Timestamp", "min"),

    session_end=("Timestamp", "max")

)

# Session duration
session_features["session_duration"] = (
    session_features["session_end"] -
    session_features["session_start"]
).dt.total_seconds()

# Target label
session_features["Purchased"] = (
    session_features["purchases"] > 0
).astype(int)

# Remove timestamp columns
session_features.drop(
    columns=["session_start", "session_end"],
    inplace=True
)

# Replace missing values
session_features.fillna(0, inplace=True)

# Save processed data
session_features.to_csv(
    "data/processed/session_features.csv"
)

print("="*50)
print("Feature Engineering Completed")
print("="*50)

print()

print(session_features.head())

print()

print("Shape:", session_features.shape)

print()

print("Purchased Distribution")

print(session_features["Purchased"].value_counts())
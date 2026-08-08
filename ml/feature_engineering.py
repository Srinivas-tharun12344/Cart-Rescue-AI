import pandas as pd

print("Loading datasets...")

# --------------------------
# Load Datasets
# --------------------------

sessions = pd.read_csv("data/raw/sessions.csv")
events = pd.read_csv("data/raw/events.csv")
customers = pd.read_csv("data/raw/customers.csv")

# --------------------------
# Convert timestamps
# --------------------------

events["timestamp"] = pd.to_datetime(events["timestamp"])

# --------------------------
# Page Views
# --------------------------

page_views = (
    events[events["event_type"] == "page_view"]
    .groupby("session_id")
    .size()
    .rename("Page Views")
)

# --------------------------
# Product Views
# --------------------------

product_views = (
    events[events["product_id"].notna()]
    .groupby("session_id")
    .size()
    .rename("Product Views")
)

# --------------------------
# Add To Cart
# --------------------------

add_to_cart = (
    events[events["event_type"] == "add_to_cart"]
    .groupby("session_id")
    .size()
    .rename("Add To Cart")
)

# --------------------------
# Session Duration
# --------------------------

duration = (
    events.groupby("session_id")["timestamp"]
    .agg(["min", "max"])
)

duration["Session Duration"] = (
    duration["max"] - duration["min"]
).dt.total_seconds()

duration = duration["Session Duration"]

# --------------------------
# Purchase Label
# --------------------------

purchase = (
    events[events["event_type"] == "purchase"]
    .groupby("session_id")
    .size()
)

purchase = purchase.apply(lambda x: 1)
purchase.name = "Purchased"

# --------------------------
# Build Feature Table
# --------------------------

features = sessions[
    [
        "session_id",
        "customer_id",
        "device",
        "source"
    ]
].copy()

features = features.merge(
    page_views,
    on="session_id",
    how="left"
)

features = features.merge(
    product_views,
    on="session_id",
    how="left"
)

features = features.merge(
    add_to_cart,
    on="session_id",
    how="left"
)

features = features.merge(
    duration,
    on="session_id",
    how="left"
)

features = features.merge(
    purchase,
    on="session_id",
    how="left"
)

# --------------------------
# Customer Data
# --------------------------

features = features.merge(
    customers[
        [
            "customer_id",
            "country",
            "age",
            "marketing_opt_in"
        ]
    ],
    on="customer_id",
    how="left"
)

# --------------------------
# Fill Missing Values
# --------------------------

features["Page Views"] = features["Page Views"].fillna(0)
features["Product Views"] = features["Product Views"].fillna(0)
features["Add To Cart"] = features["Add To Cart"].fillna(0)
features["Session Duration"] = features["Session Duration"].fillna(0)
features["Purchased"] = features["Purchased"].fillna(0)

# --------------------------
# Simulated Business Features
# --------------------------

features["Estimated Delivery Days"] = 2
features["Cash On Delivery"] = "Available"

# --------------------------
# Save Dataset
# --------------------------

features.to_csv(
    "data/processed/session_features.csv",
    index=False
)

print("\nFeature Engineering Completed Successfully!\n")
print(features.head())
print("\nDataset Shape:", features.shape)
print("\nColumns:")
print(features.columns.tolist())
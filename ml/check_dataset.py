import pandas as pd

df = pd.read_csv("data/raw/ecommerce_clickstream_transactions.csv")

print("Total Rows:", len(df))
print()

print("Unique Users:", df["UserID"].nunique())
print("Unique Sessions:", df["SessionID"].nunique())
print()

print("Event Types:")
print(df["EventType"].value_counts())

print()

print("Outcome Counts:")
print(df["Outcome"].value_counts(dropna=False))
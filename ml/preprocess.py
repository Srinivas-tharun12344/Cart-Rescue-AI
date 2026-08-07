import pandas as pd

# Load the dataset
df = pd.read_csv("data/raw/ecommerce_clickstream_transactions.csv")

print("=" * 50)
print("Dataset Loaded Successfully")
print("=" * 50)

print("\nShape of Dataset:")
print(df.shape)

print("\nColumn Names:")
print(df.columns.tolist())

print("\nFirst 5 Rows:")
print(df.head())

print("\nMissing Values:")
print(df.isnull().sum())
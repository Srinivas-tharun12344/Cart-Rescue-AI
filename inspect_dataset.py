import pandas as pd

customers = pd.read_csv("data/raw/customers.csv")

print("=" * 80)
print("CUSTOMERS")
print("=" * 80)

print(customers.head())

print()

print(customers.columns)

print()

print(customers.shape)
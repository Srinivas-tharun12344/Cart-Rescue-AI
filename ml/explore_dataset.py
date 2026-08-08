import pandas as pd

customers = pd.read_csv("data/raw/customers.csv")
sessions = pd.read_csv("data/raw/sessions.csv")
events = pd.read_csv("data/raw/events.csv")
orders = pd.read_csv("data/raw/orders.csv")
products = pd.read_csv("data/raw/products.csv")
reviews = pd.read_csv("data/raw/reviews.csv")
order_items = pd.read_csv("data/raw/order_items.csv")

datasets = {
    "Customers": customers,
    "Sessions": sessions,
    "Events": events,
    "Orders": orders,
    "Products": products,
    "Reviews": reviews,
    "Order Items": order_items
}

for name, df in datasets.items():
    print("=" * 80)
    print(name)
    print("=" * 80)
    print(df.head())
    print()
    print(df.columns)
    print()
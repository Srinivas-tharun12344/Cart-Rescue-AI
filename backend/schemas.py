from pydantic import BaseModel


class SessionInput(BaseModel):

    # User Behaviour
    page_views: int
    product_views: int
    add_to_cart: int
    session_duration: int

    # Delivery
    estimated_delivery_days: int

    # Payment
    cash_on_delivery: str

    # Customer Information
    country: str
    device: str
    source: str
    age: int
    marketing_opt_in: bool
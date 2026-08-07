from pydantic import BaseModel

class SessionInput(BaseModel):
    page_views: int
    product_views: int
    add_to_cart: int
    session_duration: int

    delivery_days: int
    cod_available: bool
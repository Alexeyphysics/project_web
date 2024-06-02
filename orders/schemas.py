from datetime import datetime
from pydantic import BaseModel


class OrdersCreate(BaseModel):
    email: str
    fly_type: str
    date: datetime


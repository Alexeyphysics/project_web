
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, Form
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from authentication.database import get_async_session
from orders.models import order
from orders.schemas import OrdersCreate

#print(int(str(datetime.now(timezone.utc).replace(tzinfo=None))))
router = APIRouter(
    prefix="/orders",
    tags=["Order"]
)

# защита он sql инъекций, например drop table)
# orm как раз таки помогает с этим
@router.get("/")
async def get_specific_orders(fly_type: str, session: AsyncSession = Depends(get_async_session)):
    query = select(order).where(order.c.fly_type == fly_type)
    result = await session.execute(query)
    return result.mappings().all()

@router.post("/postdata")
async def add_specific_orders(session: AsyncSession = Depends(get_async_session),time_ = Form(), user_email = Form()):
    new_order = OrdersCreate(email = str(user_email), fly_type = str(time_), date = str(datetime.now(timezone.utc).replace(tzinfo=None)))
    #new_order.email = str(user_email)
    #new_order.fly_type = str(time_)
    stmt = insert(order).values(**new_order.dict())
    await session.execute(stmt)
    await session.commit()
    return {"status": "success"}

from fastapi_users import FastAPIUsers
from fastapi import FastAPI, Depends
from fastapi.staticfiles import StaticFiles
from authentication.auth import auth_backend
from authentication.models import User
from authentication.manager import get_user_manager
from authentication.schemas import UserRead, UserCreate
from orders.router import router as router_orders
from pages.router import router as router_pages
from chat.router import router as router_chat

app = FastAPI(
    title="Ballon App"
)
# использование картинок
app.mount("/static", StaticFiles(directory="static"), name="static")

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/authentication/jwt",
    tags=["authentication"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/authentication",
    tags=["authentication"],
)

current_user = fastapi_users.current_user()


@app.get("/protected-route")
def protected_route(user: User = Depends(current_user)):
    return f"Hello, {user.username}"


@app.get("/unprotected-route")
def unprotected_route():
    return f"Hello, anonym"


app.include_router(router_orders)
app.include_router(router_pages)
app.include_router(router_chat)

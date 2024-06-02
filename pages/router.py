from fastapi import APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates

from orders.router import get_specific_orders

router = APIRouter(
    prefix="",
    tags=["Pages"]
)
# подключение шаблонов
templates = Jinja2Templates(directory="templates")

# @router.get("/base")
# def get_base_page(request: Request):
#     return templates.TemplateResponse("base.html", {"request": request})
#
# @router.get("/search/{operation_type}")
# def get_search_page(request: Request, orders=Depends(get_specific_orders)):
#     return templates.TemplateResponse("search.html", {"request": request, "orders": orders["data"]})

@router.get("/index")
def get_base_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@router.get("/about")
def get_base_page(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})

@router.get("/best-tour")
def get_base_page(request: Request):
    return templates.TemplateResponse("best-tour.html", {"request": request})

@router.get("/feedback")
def get_base_page(request: Request):
    return templates.TemplateResponse("feedback.html", {"request": request})

@router.get("/galary")
def get_base_page(request: Request):
    return templates.TemplateResponse("galary.html", {"request": request})

@router.get("/chat")
def get_base_page(request: Request):
    return templates.TemplateResponse("chat.html", {"request": request})

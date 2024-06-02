from typing import List
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession
from chat.models import Messages
from chat.schemas import MessagesModel
from authentication.database import async_session_maker, get_async_session

router = APIRouter(
    prefix="/index",
    tags=["Chat"]
)


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, add_to_db: bool):
        if add_to_db:
            await self.add_messages_to_database(message)
        for connection in self.active_connections:
            await connection.send_text(message)

    @staticmethod
    async def add_messages_to_database(message: str):
        async with async_session_maker() as session:
            stmt = insert(Messages).values(
                message=message
            )
            await session.execute(stmt)
            await session.commit()


manager = ConnectionManager()

count = 0

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            #global count
            #count= count+1
            await manager.broadcast(f"{data} купил тур прямо сейчас!", add_to_db=True)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        #await manager.broadcast(f"says: {count}", add_to_db=False)

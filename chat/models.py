from sqlalchemy import Column, Integer, String

from authentication.models import Base


class Messages(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    message = Column(String)

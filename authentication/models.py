from sqlalchemy import MetaData, Table, JSON, Boolean
from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy import Column, String, Integer, TIMESTAMP, ForeignKey
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from datetime import datetime
Base: DeclarativeMeta = declarative_base()
metadata = MetaData()

role = Table(
    "role",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("permissions", JSON),
)

# user = Table(
#     "user",
#     metadata,
#     Column("id", Integer, primary_key=True),
#     Column("email", String, nullable=False),
#     Column("username", String, nullable=False),
#     Column("registered_at", TIMESTAMP, default=datetime.utcnow),
#     Column("role_id", Integer, ForeignKey(role.c.id)),
#     Column("hashed_password", String, nullable=False),
#     Column("is_active", Boolean, default=True, nullable=False),
#     Column("is_superuser", Boolean, default=False, nullable=False),
#     Column("is_verified", Boolean, default=False, nullable=False),
# )

# для users
class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String, nullable=False)
    username = Column(String, nullable=False)
    registered_at = Column(TIMESTAMP, default=datetime.utcnow)


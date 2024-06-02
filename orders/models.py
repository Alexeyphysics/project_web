from sqlalchemy import Table, Column, Integer, String, TIMESTAMP, MetaData

# акумулирует информацию для алембик, чтобы прогонять ревизии
metadata = MetaData()

order = Table(
    "order",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String),
    Column("fly_type", String),
    Column("date", TIMESTAMP),
)

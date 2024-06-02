"""new8

Revision ID: 03637d18a40b
Revises: 5df1312c2e09
Create Date: 2024-04-30 16:00:15.165747

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '03637d18a40b'
down_revision: Union[str, None] = '5df1312c2e09'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('permissions', sa.JSON(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('role')
    op.drop_constraint('user_role_id_fkey', 'user', type_='foreignkey')
    op.create_foreign_key(None, 'user', 'role_new', ['role_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.create_foreign_key('user_role_id_fkey', 'user', 'role', ['role_id'], ['id'])
    op.create_table('role',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('permissions', postgresql.JSON(astext_type=sa.Text()), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='role_pkey')
    )
    op.drop_table('role_new')
    # ### end Alembic commands ###
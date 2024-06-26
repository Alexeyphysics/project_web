"""new2

Revision ID: 4955b0867d20
Revises: 566ea1d54255
Create Date: 2024-04-26 13:49:10.981441

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4955b0867d20'
down_revision: Union[str, None] = '566ea1d54255'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('registered_at', sa.TIMESTAMP(), nullable=True))
    op.add_column('user', sa.Column('role_id', sa.Integer(), nullable=True))
    op.add_column('user', sa.Column('hashed_password', sa.String(), nullable=False))
    op.add_column('user', sa.Column('is_active', sa.Boolean(), nullable=False))
    op.add_column('user', sa.Column('is_superuser', sa.Boolean(), nullable=False))
    op.add_column('user', sa.Column('is_verified', sa.Boolean(), nullable=False))
    op.create_foreign_key(None, 'user', 'role', ['role_id'], ['id'])
    op.drop_column('user', 'password')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_column('user', 'is_verified')
    op.drop_column('user', 'is_superuser')
    op.drop_column('user', 'is_active')
    op.drop_column('user', 'hashed_password')
    op.drop_column('user', 'role_id')
    op.drop_column('user', 'registered_at')
    # ### end Alembic commands ###

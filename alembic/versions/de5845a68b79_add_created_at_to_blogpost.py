"""Add created_at to BlogPost

Revision ID: de5845a68b79
Revises: bc8dd9e30bf8
Create Date: 2025-03-31 15:35:12.094156

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'de5845a68b79'
down_revision: Union[str, None] = 'bc8dd9e30bf8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('blog_posts', sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('blog_posts', 'created_at')
    # ### end Alembic commands ###

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Create an async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
)

# Create a session factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

### Dependency to get the session
async def get_session():
    async with AsyncSessionLocal() as session:
        yield session
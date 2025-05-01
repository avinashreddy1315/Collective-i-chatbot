import os
import redis.asyncio as aioredis
from dotenv import load_dotenv

load_dotenv()
redis = aioredis.from_url(os.getenv("REDIS_URL"), encoding="utf-8", decode_responses=True)

async def get_cached(key: str):
    return await redis.get(key)

async def set_cached(key: str, value: str, expire: int = 3600):
    await redis.set(key, value, ex=expire)

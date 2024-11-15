from fastapi import Depends, Request
from app.core.middleware import verify_clerk_token


async def get_current_user(request: Request) -> str:
    return await verify_clerk_token(request)

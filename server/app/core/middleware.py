from typing import Optional
from fastapi import Request, HTTPException
import clerk
from app.core.config import settings


async def verify_clerk_token(request: Request) -> Optional[str]:
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    
    token = auth_header.split(" ")[1]
    try:
        # Use Clerk's verify_token method
        session = clerk.sessions.verify_session(token)
        return session.user_id
    except Exception as e:
        print(f"Token verification failed: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")
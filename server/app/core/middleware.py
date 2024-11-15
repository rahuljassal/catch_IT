from typing import Optional
from fastapi import Request, HTTPException
import jwt
from app.core.config import settings


async def verify_clerk_token(request: Request) -> Optional[str]:
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    
    token = auth_header.split(" ")[1]
    try:
        
        # Format the PEM key correctly
        public_key = f"-----BEGIN PUBLIC KEY-----\n{settings.CLERK_PEM_PUBLIC_KEY}\n-----END PUBLIC KEY-----"
        
        # Verify the JWT token
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=settings.CLERK_JWT_AUDIENCE,
            issuer=settings.CLERK_ISSUER,
            options={"verify_exp": True}
        )
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        print("Token has expired")
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError as e:
        print(f"Invalid token: {str(e)}")
        print(f"Expected audience: {settings.CLERK_JWT_AUDIENCE}")
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=401, detail=str(e))
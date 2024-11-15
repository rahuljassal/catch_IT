from fastapi import APIRouter, Depends
from app.api.deps import get_current_user
from app.schemas.user import User

router = APIRouter()


@router.get("/current-user", response_model=User)
async def get_current_user_info(current_user_id: str = Depends(get_current_user)):
    # Fetch user info from your database using clerk_id
    return {"id": 1, "clerk_id": current_user_id, "email": "user@example.com"}

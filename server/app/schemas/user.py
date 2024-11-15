from typing import Optional
from app.schemas.base import BaseSchema


class UserBase(BaseSchema):
    clerk_id: str
    email: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    username: Optional[str] = None
    organization: Optional[str] = None
    profile_image_url: Optional[str] = None

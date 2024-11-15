from app.schemas.base import BaseSchema


class UserBase(BaseSchema):
    clerk_id: str
    email: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class OrganizationBase(BaseModel):
    name: str
    description: Optional[str] = None
    website: Optional[str] = None


class OrganizationCreate(OrganizationBase):
    pass


class OrganizationUpdate(OrganizationBase):
    pass


class OrganizationMemberBase(BaseModel):
    user_id: str
    role: str = "member"


class OrganizationMemberCreate(OrganizationMemberBase):
    organization_id: int


class OrganizationMemberResponse(OrganizationMemberBase):
    id: int
    organization_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class OrganizationResponse(OrganizationBase):
    id: int
    created_at: datetime
    updated_at: datetime
    members: List[OrganizationMemberResponse]

    class Config:
        from_attributes = True

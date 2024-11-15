from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.service import ServiceStatus


class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: ServiceStatus = ServiceStatus.OPERATIONAL
    organization_id: int


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ServiceStatus] = None


class ServiceResponse(ServiceBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

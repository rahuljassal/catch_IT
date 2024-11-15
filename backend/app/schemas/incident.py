from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.incident import IncidentStatus


class IncidentBase(BaseModel):
    title: str
    description: str
    status: IncidentStatus = IncidentStatus.INVESTIGATING
    service_id: int


class IncidentCreate(IncidentBase):
    pass


class IncidentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[IncidentStatus] = None


class IncidentResponse(IncidentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

from sqlalchemy import Column, String, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.base import TimestampedBase
import enum


class IncidentStatus(str, enum.Enum):
    INVESTIGATING = "investigating"
    IDENTIFIED = "identified"
    MONITORING = "monitoring"
    RESOLVED = "resolved"


class Incident(TimestampedBase):
    __tablename__ = "incidents"

    title = Column(String, index=True)
    description = Column(String)
    status = Column(Enum(IncidentStatus), default=IncidentStatus.INVESTIGATING)
    service_id = Column(Integer, ForeignKey("services.id"))

    service = relationship("Service", back_populates="incidents")

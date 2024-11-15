from sqlalchemy import Column, String, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.base import TimestampedBase
import enum


class ServiceStatus(str, enum.Enum):
    OPERATIONAL = "operational"
    DEGRADED = "degraded"
    OUTAGE = "outage"
    MAINTENANCE = "maintenance"


class Service(TimestampedBase):
    __tablename__ = "services"

    name = Column(String, index=True)
    description = Column(String)
    status = Column(Enum(ServiceStatus), default=ServiceStatus.OPERATIONAL)
    organization_id = Column(Integer, ForeignKey("organizations.id"))

    organization = relationship("Organization", back_populates="services")
    incidents = relationship("Incident", back_populates="service")

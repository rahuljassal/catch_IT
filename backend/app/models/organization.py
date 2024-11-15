from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import TimestampedBase


class Organization(TimestampedBase):
    __tablename__ = "organizations"

    name = Column(String, index=True)
    description = Column(String, nullable=True)
    website = Column(String, nullable=True)

    services = relationship("Service", back_populates="organization")
    members = relationship("OrganizationMember", back_populates="organization")


class OrganizationMember(TimestampedBase):
    __tablename__ = "organization_members"

    organization_id = Column(Integer, ForeignKey("organizations.id"))
    user_id = Column(String, index=True)  # Clerk user ID
    role = Column(String, default="member")  # admin, member

    organization = relationship("Organization", back_populates="members")

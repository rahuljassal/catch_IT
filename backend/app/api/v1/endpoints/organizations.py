from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.organization import Organization, OrganizationMember
from app.schemas.organization import (
    OrganizationCreate,
    OrganizationUpdate,
    OrganizationResponse,
    OrganizationMemberCreate,
)
from app.api.deps import get_current_user, get_organization_member

router = APIRouter()


@router.get("/", response_model=List[OrganizationResponse])
def get_organizations(
    db: Session = Depends(get_db), current_user: str = Depends(get_current_user)
):
    return (
        db.query(Organization)
        .join(OrganizationMember)
        .filter(OrganizationMember.user_id == current_user)
        .all()
    )


@router.post("/", response_model=OrganizationResponse)
def create_organization(
    org: OrganizationCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    db_org = Organization(**org.dict())
    db.add(db_org)
    db.flush()

    # Add creator as admin
    member = OrganizationMember(
        organization_id=db_org.id, user_id=current_user, role="admin"
    )
    db.add(member)

    db.commit()
    db.refresh(db_org)
    return db_org


@router.put("/{org_id}", response_model=OrganizationResponse)
def update_organization(
    org_id: int,
    org: OrganizationUpdate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    member = get_organization_member(org_id, current_user, db)
    if member.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only organization admins can update organization details",
        )

    db_org = db.query(Organization).filter(Organization.id == org_id).first()
    if not db_org:
        raise HTTPException(status_code=404, detail="Organization not found")

    for key, value in org.dict(exclude_unset=True).items():
        setattr(db_org, key, value)

    db.commit()
    db.refresh(db_org)
    return db_org


@router.post("/{org_id}/members", response_model=OrganizationMemberResponse)
def add_organization_member(
    org_id: int,
    member: OrganizationMemberCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    admin_member = get_organization_member(org_id, current_user, db)
    if admin_member.role != "admin":
        raise HTTPException(
            status_code=403, detail="Only organization admins can add members"
        )

    db_member = OrganizationMember(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

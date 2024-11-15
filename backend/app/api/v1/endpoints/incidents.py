from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.incident import Incident
from app.schemas.incident import IncidentCreate, IncidentUpdate, IncidentResponse
from app.api.deps import get_current_user, get_organization_member

router = APIRouter()


@router.get("/", response_model=List[IncidentResponse])
def get_incidents(service_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Incident)
    if service_id:
        query = query.filter(Incident.service_id == service_id)
    return query.all()


@router.post("/", response_model=IncidentResponse)
def create_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    # Verify user has access to the service
    service = db.query(Service).filter(Service.id == incident.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    # Check organization membership
    _ = get_organization_member(service.organization_id, current_user, db)

    db_incident = Incident(**incident.dict())
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident


@router.put("/{incident_id}", response_model=IncidentResponse)
def update_incident(
    incident_id: int,
    incident: IncidentUpdate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    db_incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not db_incident:
        raise HTTPException(status_code=404, detail="Incident not found")

    # Check organization membership
    service = db.query(Service).filter(Service.id == db_incident.service_id).first()
    _ = get_organization_member(service.organization_id, current_user, db)

    for key, value in incident.dict(exclude_unset=True).items():
        setattr(db_incident, key, value)

    db.commit()
    db.refresh(db_incident)
    return db_incident


@router.delete("/{incident_id}")
def delete_incident(
    incident_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user),
):
    db_incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not db_incident:
        raise HTTPException(status_code=404, detail="Incident not found")

    # Check organization membership
    service = db.query(Service).filter(Service.id == db_incident.service_id).first()
    member = get_organization_member(service.organization_id, current_user, db)

    # Only admins can delete incidents
    if member.role != "admin":
        raise HTTPException(
            status_code=403, detail="Only organization admins can delete incidents"
        )

    db.delete(db_incident)
    db.commit()
    return {"message": "Incident deleted successfully"}

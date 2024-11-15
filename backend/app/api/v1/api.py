from fastapi import APIRouter
from app.api.v1.endpoints import services, incidents, organizations

api_router = APIRouter()

api_router.include_router(services.router, prefix="/services", tags=["services"])

api_router.include_router(incidents.router, prefix="/incidents", tags=["incidents"])

api_router.include_router(
    organizations.router, prefix="/organizations", tags=["organizations"]
)

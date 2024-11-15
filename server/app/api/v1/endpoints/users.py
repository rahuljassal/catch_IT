from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user
from app.schemas.user import User
import requests
from app.core.config import settings

router = APIRouter()

async def get_clerk_user_details(user_id: str) -> dict:
    """Fetch user details from Clerk API"""
    headers = {
        "Authorization": f"Bearer {settings.CLERK_SECRET_KEY}",
        "Content-Type": "application/json"
    }
    
    url = f"https://api.clerk.com/v1/users/{user_id}"
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        user_data = response.json()
        
        # Extract primary email
        primary_email = next(
            (email["email_address"] for email in user_data["email_addresses"] 
             if email["id"] == user_data["primary_email_address_id"]),
            None
        )
        
        # Extract organization (if using Clerk Organizations)
        organization = None
        if "organization_memberships" in user_data and user_data["organization_memberships"]:
            org_id = user_data["organization_memberships"][0]["organization"]["id"]
            org_response = requests.get(
                f"https://api.clerk.com/v1/organizations/{org_id}",
                headers=headers
            )
            if org_response.status_code == 200:
                organization = org_response.json().get("name")
        
        return {
            "id": 1,  # You might want to get this from your database
            "clerk_id": user_id,
            "email": primary_email,
            "first_name": user_data.get("first_name"),
            "last_name": user_data.get("last_name"),
            "username": user_data.get("username"),
            "organization": organization,
            "profile_image_url": user_data.get("profile_image_url")
        }
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching user details: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching user details")

@router.get("/current-user", response_model=User)
async def get_current_user_info(current_user_id: str = Depends(get_current_user)):
    """Get current user information including Clerk details"""
    return await get_clerk_user_details(current_user_id)

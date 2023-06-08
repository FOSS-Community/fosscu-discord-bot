from fastapi import APIRouter, Depends, HTTPException, status
from api.schemas import User_Schema
from api.schemas import User_Schema
from api.hashing import CreateHash
from sqlalchemy.orm import Session
from api.database import get_db
from api.models import User
from api.oauth2 import get_current_user

router = APIRouter(
    tags=["User"],
    prefix="/user"
)


@router.post("/create_user")
def create_user(user: User_Schema, db: Session = Depends(get_db)):
    new_user = User(name=user.name, email=user.email, password=CreateHash.bcrypt(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
from fastapi import APIRouter, Depends, HTTPException, status
from api.schemas import Login
from sqlalchemy.orm import Session
from api.database import get_db
from api.models import User
from api.hashing import CreateHash
from api.token import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(
    tags=["auth"]
)


@router.post("/login")
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user with this Creds are Available")
    if not CreateHash.verify(user.password, request.password):
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Wrong Password")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
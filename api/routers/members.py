from fastapi import APIRouter, Depends, HTTPException, status, Response
from api.database import get_db
from api.models import Member
from api.schemas import Add_member, User_Schema
from sqlalchemy.orm import Session
from api.oauth2 import get_current_user

router = APIRouter(
    tags=['members'],
    prefix="/members"
)

@router.get("/verify/{email}/{code}", status_code=status.HTTP_200_OK)
def get_byId(email: str, code:str, db: Session = Depends(get_db)):
    is_member_mail = db.query(Member).filter(Member.email == email).first()
    is_member_code = db.query(Member).filter(Member.s_code == code).first()
    if is_member_code and is_member_mail:
        return {"status": "Verified"}
    else:
        if is_member_mail:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail=f"Wrong Secret Code for the {email}")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"User with this {email} is not available in the database")

@router.post("/add_member", status_code=status.HTTP_201_CREATED)
def add_member(member: Add_member, current_user: User_Schema = Depends(get_current_user), db: Session = Depends(get_db)):
    new_member = Member(name = member.name, email= member.email, s_code = member.s_code)
    db.add(new_member)
    db.commit()
    db.refresh(new_member)
    return {"staus": f"{new_member.name} is Successfully added to DataBase"}
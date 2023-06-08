from typing import Optional, List

from pydantic import BaseModel


class User_Schema(BaseModel):
    name: str
    email: str
    password: str


class Verify_user(BaseModel):
    email: str
    s_code: str


class Login(BaseModel):
    username: str
    password: str

class Add_member(BaseModel):
    name: str
    email: str
    s_code: str

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    username: str  # This will be the email
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


class NoteCreate(BaseModel):
    title: str
    description: str | None = None
    tag: str | None = None


class NoteResponse(NoteCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

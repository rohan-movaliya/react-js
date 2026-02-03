from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas import NoteCreate, NoteResponse
from app.models import Note
from app.dependencies import get_current_user, get_db

router = APIRouter(prefix="/notes", tags=["Notes"])

@router.post("/", response_model=NoteResponse)
def create_note(
    note: NoteCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    new_note = Note(**note.dict(), user_id=user.id)
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note

@router.get("/", response_model=list[NoteResponse])
def get_notes(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return db.query(Note).filter(Note.user_id == user.id).all()

@router.put("/{note_id}", response_model=NoteResponse)
def update_note(
    note_id: int,
    note: NoteCreate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    db_note = db.query(Note).filter(Note.id == note_id, Note.user_id == user.id).first()
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")

    for key, value in note.dict().items():
        setattr(db_note, key, value)

    db.commit()
    db.refresh(db_note)
    return db_note

@router.delete("/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    note = db.query(Note).filter(Note.id == note_id, Note.user_id == user.id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return {"message": "Note deleted"}

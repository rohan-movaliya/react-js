from fastapi import FastAPI
from app.database import Base, engine
from app.routers import user, note

Base.metadata.create_all(bind=engine)

app = FastAPI(title="INoteBook API")

app.include_router(user.router)
app.include_router(note.router)

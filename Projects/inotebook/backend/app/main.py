from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import user, note

Base.metadata.create_all(bind=engine)

app = FastAPI(title="INoteBook API")

# CORS configuration
origins = [
    "http://localhost:3000",   # React default
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # Allowed origins
    allow_credentials=True,
    allow_methods=["*"],          # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],          # Allow all headers
)

app.include_router(user.router)
app.include_router(note.router)

# {
#   "name": "Rohan Movaliya",
#   "email": "rohan@gmail.com",
#   "password": "Rohan@123"
# }

import uvicorn
from fastapi import FastAPI
from api.models import Base
from api.database import engine
from api.routers import members, auth, users

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(members.router)
app.include_router(auth.router)
app.include_router(users.router)

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8080)
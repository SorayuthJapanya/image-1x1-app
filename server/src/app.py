from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routes import uploads
import os

load_dotenv()

domain_url = os.getenv("DOMAIN_NAME")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"{domain_url}"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(uploads.router, prefix="/api")


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import product, category

from app.db.session import SessionLocal
from app.middleware.logging import log_request_middleware
from app.middleware.error_handler import error_handler_middleware
from fastapi.exceptions import RequestValidationError
from app.core.exceptions import validation_exception_handler, http_exception_handler

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.DESCRIPTION,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(product.router, prefix=settings.API_V1_STR, tags=["products"])
app.include_router(category.router, prefix=settings.API_V1_STR, tags=["categories"])

# Add these lines after creating the FastAPI app
app.middleware("http")(log_request_middleware)
app.middleware("http")(error_handler_middleware)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)


@app.get("/")
async def root():
    return {"message": "Welcome to Backoffice POS System API"}

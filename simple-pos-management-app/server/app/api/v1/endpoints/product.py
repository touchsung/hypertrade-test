from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.schemas.product import Product, ProductCreate
from app.schemas.api import PaginatedResponse
from app.services import product_service

router = APIRouter()


@router.get("/products/", response_model=PaginatedResponse[Product])
async def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, gt=0, le=100),
    db: Session = Depends(get_db),
):
    products, total = product_service.get_products(db, skip, limit)
    total_pages = (total + limit - 1) // limit
    return PaginatedResponse(items=products, total_pages=total_pages, total=total)


@router.post("/products/", response_model=Product)
async def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
):
    return product_service.create_product(db, product)


@router.get("/products/{product_id}", response_model=Product)
async def get_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    product = product_service.get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/products/{product_id}", response_model=Product)
async def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db),
):
    db_product = product_service.update_product(db, product_id, product)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product


@router.delete("/products/{product_id}")
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
):
    db_product = product_service.delete_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    return {"message": "Product deleted successfully"}


@router.patch("/products/{product_id}/stock", response_model=Product)
async def update_stock(
    product_id: int,
    stock_quantity: int,
    db: Session = Depends(get_db),
):
    if stock_quantity < 0:
        raise HTTPException(status_code=400, detail="Stock quantity cannot be negative")

    db_product = product_service.update_stock(db, product_id, stock_quantity)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    return db_product

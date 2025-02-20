from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.category import Category, CategoryCreate, CategoryWithProducts
from app.db.session import get_db
from app.services import category_service

router = APIRouter()


@router.get("/categories/", response_model=List[Category])
async def get_categories(
    db: Session = Depends(get_db),
):
    return category_service.get_categories(db)


@router.post("/categories/", response_model=Category)
async def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db),
):
    existing_category = category_service.get_category_by_name(db, category.name)
    if existing_category:
        raise HTTPException(
            status_code=400, detail="Category with this name already exists"
        )
    return category_service.create_category(db, category)


@router.get("/categories/{category_id}", response_model=CategoryWithProducts)
async def get_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    category = category_service.get_category_by_id(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.put("/categories/{category_id}", response_model=Category)
async def update_category(
    category_id: int,
    category: CategoryCreate,
    db: Session = Depends(get_db),
):
    updated_category = category_service.update_category(db, category_id, category)
    if not updated_category:
        raise HTTPException(status_code=404, detail="Category not found")
    return updated_category


@router.delete("/categories/{category_id}")
async def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    result = category_service.delete_category(db, category_id)
    if result is False:
        raise HTTPException(status_code=404, detail="Category not found")
    if result == "has_products":
        raise HTTPException(
            status_code=400, detail="Cannot delete category with existing products"
        )
    return {"message": "Category deleted successfully"}

from pydantic import BaseModel
from datetime import datetime
from typing import List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.product import Product


class CategoryBase(BaseModel):
    name: str
    status: bool = True


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CategoryWithProducts(Category):
    products: List["Product"] = []

    class Config:
        from_attributes = True

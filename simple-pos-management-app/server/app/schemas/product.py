from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

from app.schemas.category import Category


class ProductBase(BaseModel):
    name: str
    sku: str
    price: float = Field(gt=0)
    stock_quantity: int = Field(ge=0)
    description: Optional[str] = None
    category_id: int
    status: bool = True


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    category: Category

    class Config:
        from_attributes = True

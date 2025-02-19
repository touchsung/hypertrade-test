from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.models import Product as ProductModel
from app.schemas.product import ProductCreate


def get_products(
    db: Session, skip: int = 0, limit: int = 100
) -> tuple[List[ProductModel], int]:
    query = db.query(ProductModel).join(ProductModel.category)
    total = query.count()
    products = query.order_by(ProductModel.id.asc()).offset(skip).limit(limit).all()
    return products, total


def create_product(db: Session, product: ProductCreate) -> ProductModel:
    db_product = ProductModel(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def get_product_by_id(db: Session, product_id: int) -> Optional[ProductModel]:
    return db.query(ProductModel).filter(ProductModel.id == product_id).first()


def update_product(
    db: Session, product_id: int, product: ProductCreate
) -> Optional[ProductModel]:
    db_product = get_product_by_id(db, product_id)
    if not db_product:
        return None

    for key, value in product.model_dump().items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int) -> bool:
    db_product = get_product_by_id(db, product_id)
    if not db_product:
        return False

    db.delete(db_product)
    db.commit()
    return True


def update_stock(
    db: Session, product_id: int, stock_quantity: int
) -> Optional[ProductModel]:
    db_product = get_product_by_id(db, product_id)
    if not db_product:
        return None

    db_product.stock_quantity = stock_quantity
    db.commit()
    db.refresh(db_product)
    return db_product

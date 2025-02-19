from sqlalchemy.orm import Session
from typing import List, Optional, Union
from app.models.models import Category as CategoryModel
from app.schemas.category import CategoryCreate


def get_categories(db: Session) -> List[CategoryModel]:
    return db.query(CategoryModel).all()


def create_category(db: Session, category: CategoryCreate) -> CategoryModel:
    db_category = CategoryModel(**category.model_dump())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def get_category_by_id(db: Session, category_id: int) -> Optional[CategoryModel]:
    return db.query(CategoryModel).filter(CategoryModel.id == category_id).first()


def update_category(
    db: Session, category_id: int, category: CategoryCreate
) -> Optional[CategoryModel]:
    db_category = get_category_by_id(db, category_id)
    if not db_category:
        return None

    for key, value in category.model_dump().items():
        setattr(db_category, key, value)

    db.commit()
    db.refresh(db_category)
    return db_category


def delete_category(db: Session, category_id: int) -> Union[bool, str]:
    db_category = get_category_by_id(db, category_id)
    if not db_category:
        return False

    if db_category.products:
        return "has_products"

    db.delete(db_category)
    db.commit()
    return True

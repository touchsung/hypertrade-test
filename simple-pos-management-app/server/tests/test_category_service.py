import pytest
from app.services.category_service import (
    get_categories,
    create_category,
    get_category_by_id,
    update_category,
    delete_category,
)
from app.models.models import Category, Product
from app.schemas.category import CategoryCreate


@pytest.fixture
def sample_category(db_session):
    category = Category(name="Test Category", status=True)
    db_session.add(category)
    db_session.commit()
    return category


@pytest.fixture
def category_with_products(db_session, sample_category):
    product = Product(
        name="Test Product",
        sku="TEST123",
        price=99.99,
        stock_quantity=10,
        description="Test description",
        category_id=sample_category.id,
        status=True,
    )
    db_session.add(product)
    db_session.commit()
    return sample_category


def test_get_categories(db_session, sample_category):
    # Test getting all categories
    categories = get_categories(db_session)

    assert isinstance(categories, list)
    assert len(categories) == 1
    assert categories[0].id == sample_category.id
    assert categories[0].name == "Test Category"


def test_create_category(db_session):
    # Test creating a new category
    category_data = CategoryCreate(
        name="New Category",
        status=True,
    )

    new_category = create_category(db_session, category_data)

    assert new_category.id is not None
    assert new_category.name == "New Category"
    assert new_category.status is True


def test_get_category_by_id(db_session, sample_category):
    # Test getting existing category
    category = get_category_by_id(db_session, sample_category.id)
    assert category is not None
    assert category.id == sample_category.id
    assert category.name == "Test Category"

    # Test getting non-existent category
    non_existent = get_category_by_id(db_session, 9999)
    assert non_existent is None


def test_update_category(db_session, sample_category):
    # Test updating existing category
    update_data = CategoryCreate(
        name="Updated Category",
        status=False,
    )

    updated_category = update_category(db_session, sample_category.id, update_data)

    assert updated_category is not None
    assert updated_category.name == "Updated Category"
    assert updated_category.status is False

    # Test updating non-existent category
    non_existent = update_category(db_session, 9999, update_data)
    assert non_existent is None


def test_delete_category(db_session, sample_category):
    # Test deleting existing category without products
    result = delete_category(db_session, sample_category.id)
    assert result is True

    # Verify category is deleted
    deleted_category = get_category_by_id(db_session, sample_category.id)
    assert deleted_category is None


def test_delete_category_with_products(db_session, category_with_products):
    # Test attempting to delete category that has products
    result = delete_category(db_session, category_with_products.id)
    assert result == "has_products"

    # Verify category still exists
    category = get_category_by_id(db_session, category_with_products.id)
    assert category is not None


def test_delete_non_existent_category(db_session):
    # Test deleting non-existent category
    result = delete_category(db_session, 9999)
    assert result is False

import pytest
from datetime import datetime
from app.services.product_service import (
    get_products,
    create_product,
    get_product_by_id,
    update_product,
    delete_product,
    update_stock,
)
from app.models.models import Product, Category
from app.schemas.product import ProductCreate


@pytest.fixture
def sample_category(db_session):
    category = Category(name="Test Category", status=True)
    db_session.add(category)
    db_session.commit()
    return category


@pytest.fixture
def sample_product(db_session, sample_category):
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
    return product


def test_get_products(db_session, sample_product):
    # Test getting products with pagination
    products, total = get_products(db_session)

    assert isinstance(products, list)
    assert len(products) == 1
    assert total == 1
    assert products[0].id == sample_product.id
    assert products[0].name == "Test Product"


def test_create_product(db_session, sample_category):
    # Test creating a new product
    product_data = ProductCreate(
        name="New Product",
        sku="NEW123",
        price=149.99,
        stock_quantity=20,
        description="New product description",
        category_id=sample_category.id,
        status=True,
    )

    new_product = create_product(db_session, product_data)

    assert new_product.id is not None
    assert new_product.name == "New Product"
    assert new_product.sku == "NEW123"
    assert new_product.price == 149.99
    assert new_product.stock_quantity == 20
    assert new_product.category_id == sample_category.id


def test_get_product_by_id(db_session, sample_product):
    # Test getting existing product
    product = get_product_by_id(db_session, sample_product.id)
    assert product is not None
    assert product.id == sample_product.id

    # Test getting non-existent product
    non_existent = get_product_by_id(db_session, 9999)
    assert non_existent is None


def test_update_product(db_session, sample_product, sample_category):
    # Test updating existing product
    update_data = ProductCreate(
        name="Updated Product",
        sku="UPD123",
        price=199.99,
        stock_quantity=30,
        description="Updated description",
        category_id=sample_category.id,
        status=True,
    )

    updated_product = update_product(db_session, sample_product.id, update_data)

    assert updated_product is not None
    assert updated_product.name == "Updated Product"
    assert updated_product.price == 199.99

    # Test updating non-existent product
    non_existent = update_product(db_session, 9999, update_data)
    assert non_existent is None


def test_delete_product(db_session, sample_product):
    # Test deleting existing product
    result = delete_product(db_session, sample_product.id)
    assert result is True

    # Verify product is deleted
    deleted_product = get_product_by_id(db_session, sample_product.id)
    assert deleted_product is None

    # Test deleting non-existent product
    result = delete_product(db_session, 9999)
    assert result is False


def test_update_stock(db_session, sample_product):
    # Test updating stock for existing product
    updated_product = update_stock(db_session, sample_product.id, 50)

    assert updated_product is not None
    assert updated_product.stock_quantity == 50

    # Test updating stock for non-existent product
    result = update_stock(db_session, 9999, 50)
    assert result is None

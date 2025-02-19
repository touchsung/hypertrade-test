# Backoffice POS System API Documentation

## Base URL

The API is accessible at: `/api/v1`

## API Endpoints

### Products

#### 1. Get All Products

```http
GET /api/v1/products/
```

Query Parameters:

- `skip` (optional): Number of records to skip (default: 0)

- `limit` (optional): Maximum number of records to return (default: 100)

- `search` (optional): Search term for filtering products by name or SKU

Response:

```json
{
  "items": [
    {
      "id": 1,
      "name": "Product Name",
      "sku": "SKU123",
      "price": 99.99,
      "stock_quantity": 100,
      "description": "Product description",
      "category_id": 1,
      "status": true,
      "created_at": "2024-03-20T10:00:00",
      "updated_at": "2024-03-20T10:00:00"
    }
  ],
  "total_pages": 1,
  "total": 1
}
```

The response is paginated and includes:

- `items`: Array of product objects
- `total_pages`: Total number of pages based on the limit
- `total`: Total number of products matching the query

#### 2. Create Product

```http
POST /api/v1/products/
```

Request Body:

```json
{
  "name": "Product Name",
  "sku": "SKU123",
  "price": 99.99,
  "stock_quantity": 100,
  "description": "Product description",
  "category_id": 1,
  "status": true
}
```

#### 3. Get Product by ID

```http
GET /api/v1/products/{product_id}
```

#### 4. Update Product

```http
PUT /api/v1/products/{product_id}
```

Request Body: Same as Create Product

#### 5. Delete Product

```http
DELETE /api/v1/products/{product_id}
```

#### 6. Update Product Stock

```http
PATCH /api/v1/products/{product_id}/stock
```

Request Body:

```json
{
  "stock_quantity": 100
}
```

### Categories

#### 1. Get All Categories

```http
GET /api/v1/categories/
```

#### 2. Create Category

```http
POST /api/v1/categories/
```

Request Body:

```json
{
  "name": "Category Name",
  "status": true
}
```

#### 3. Get Category with Products

```http
GET /api/v1/categories/{category_id}
```

#### 4. Update Category

```http
PUT /api/v1/categories/{category_id}
```

Request Body: Same as Create Category

#### 5. Delete Category

```http
DELETE /api/v1/categories/{category_id}
```

Note: Cannot delete categories that have associated products.

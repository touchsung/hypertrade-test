# Retail Database Project

A containerized PostgreSQL database setup for managing retail products and transactions data.

## Project Structure

- `docker-compose.yml`: Docker configuration for PostgreSQL database
- `init.sql`: Database initialization script with schema and sample data

## Database Schema

### Products Table

- `id`: Serial primary key
- `barcode`: Unique integer identifier
- `division`: Product division (e.g., Food & Beverages, Personal Care)
- `category`: Product category (e.g., Dairy, Hair Care)
- `sub_category`: Specific product type (e.g., Milk, Shampoo)

### Transactions Table

- `id`: Serial primary key
- `product_code`: Product identifier
- `barcode`: Foreign key reference to products table
- `store_code`: Store identifier
- `value`: Transaction amount
- `units`: Quantity purchased
- `transaction_date`: Date of transaction

## Sample Data

The database comes pre-populated with:

- 30 product entries across 3 main divisions:
  - Food & Beverages
  - Personal Care
  - Home Care
- 30 randomly generated transactions

## Setup Instructions

1. Make sure you have Docker and Docker Compose installed
2. Clone this repository
3. Run the following command:
   ```bash
   docker-compose up -d
   ```

## Database Connection Details

- Host: localhost
- Port: 5432
- Database: mydb
- Username: postgres
- Password: postgres

## Usage

Connect to the database using any PostgreSQL client with the connection details above.

Example using psql:

```
 docker exec -it postgres_db psql -U postgres -d mydb
```

## Data Model

The database uses a simple retail data model with products organized hierarchically:

- Division → Category → Sub-category

Each transaction is linked to a product via the barcode and includes store information, transaction value, and quantity.

## Results

1. Get total sales by category:

```sql
SELECT
    p.category,
    SUM(t.value) AS total_sales
FROM transactions t
JOIN products p ON t.barcode = p.barcode
GROUP BY p.category
ORDER BY total_sales DESC;
```

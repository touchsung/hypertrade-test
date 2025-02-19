-- Create tables first
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR UNIQUE,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    sku VARCHAR UNIQUE,
    price FLOAT,
    stock_quantity INTEGER,
    description VARCHAR,
    category_id INTEGER REFERENCES categories(id),
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_categories_name ON categories(name);

-- Insert initial data into categories
INSERT INTO categories (name, status, created_at, updated_at) 
VALUES 
    ('Electronics', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Clothing', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Books', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Home & Garden', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert products with references to categories
INSERT INTO products (name, sku, price, stock_quantity, description, category_id, status, created_at, updated_at) 
VALUES 
    ('Smartphone X', 'PHON001', 699.99, 50, 'Latest smartphone with amazing features', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Laptop Pro', 'LAPT001', 1299.99, 30, 'High-performance laptop for professionals', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('T-Shirt Basic', 'TSHI001', 19.99, 100, 'Cotton basic t-shirt', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Jeans Classic', 'JEAN001', 49.99, 75, 'Classic fit denim jeans', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Python Programming', 'BOOK001', 39.99, 25, 'Complete guide to Python programming', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Garden Tools Set', 'GARD001', 89.99, 20, 'Complete set of essential garden tools', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    barcode INTEGER UNIQUE NOT NULL,
    division VARCHAR(100),
    category VARCHAR(100),
    sub_category VARCHAR(100)
);


CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    product_code VARCHAR(10) NOT NULL,
    barcode INTEGER REFERENCES products(barcode),
    store_code VARCHAR(3) NOT NULL,
    value DECIMAL(6,2),
    units INTEGER,
    transaction_date DATE DEFAULT CURRENT_DATE
);


-- Insert products data
INSERT INTO products (barcode, division, category, sub_category) VALUES
-- Food & Beverages
(1001001, 'Food & Beverages', 'Dairy', 'Milk'),
(1001002, 'Food & Beverages', 'Dairy', 'Cheese'),
(1001003, 'Food & Beverages', 'Dairy', 'Yogurt'),
(1001004, 'Food & Beverages', 'Bakery', 'Bread'),
(1001005, 'Food & Beverages', 'Bakery', 'Pastries'),
(1001006, 'Food & Beverages', 'Beverages', 'Soft Drinks'),
(1001007, 'Food & Beverages', 'Beverages', 'Water'),
(1001008, 'Food & Beverages', 'Snacks', 'Chips'),
(1001009, 'Food & Beverages', 'Snacks', 'Nuts'),
(1001010, 'Food & Beverages', 'Snacks', 'Cookies'),

-- Personal Care
(1002001, 'Personal Care', 'Hair Care', 'Shampoo'),
(1002002, 'Personal Care', 'Hair Care', 'Conditioner'),
(1002003, 'Personal Care', 'Skin Care', 'Face Wash'),
(1002004, 'Personal Care', 'Skin Care', 'Moisturizer'),
(1002005, 'Personal Care', 'Oral Care', 'Toothpaste'),
(1002006, 'Personal Care', 'Oral Care', 'Toothbrush'),
(1002007, 'Personal Care', 'Body Care', 'Soap'),
(1002008, 'Personal Care', 'Body Care', 'Deodorant'),
(1002009, 'Personal Care', 'Cosmetics', 'Lipstick'),
(1002010, 'Personal Care', 'Cosmetics', 'Foundation'),

-- Home Care
(1003001, 'Home Care', 'Cleaning', 'All Purpose Cleaner'),
(1003002, 'Home Care', 'Cleaning', 'Dish Soap'),
(1003003, 'Home Care', 'Cleaning', 'Laundry Detergent'),
(1003004, 'Home Care', 'Paper Goods', 'Toilet Paper'),
(1003005, 'Home Care', 'Paper Goods', 'Paper Towels'),
(1003006, 'Home Care', 'Air Care', 'Air Freshener'),
(1003007, 'Home Care', 'Pest Control', 'Insect Spray'),
(1003008, 'Home Care', 'Storage', 'Trash Bags'),
(1003009, 'Home Care', 'Storage', 'Food Storage'),
(1003010, 'Home Care', 'Storage', 'Containers');

-- Generate 30 random transactions
INSERT INTO transactions (product_code, barcode, store_code, value, units, transaction_date)
SELECT 
    'P' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0') as product_code,
    barcode,
    'S' || LPAD(FLOOR(RANDOM() * 100)::TEXT, 2, '0') as store_code,
    ROUND(CAST(RANDOM() * 100 + 1 AS NUMERIC), 2) as value,
    FLOOR(RANDOM() * 5 + 1)::INT as units,
    CURRENT_DATE - (FLOOR(RANDOM() * 365)::INT || ' days')::INTERVAL as transaction_date
FROM (
    SELECT barcode 
    FROM products 
    ORDER BY RANDOM() 
    LIMIT 1000
) sub;


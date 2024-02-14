-- Delete all data from the cart_product table if it exists
DELETE FROM cart_product WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cart_product');

-- Delete all data from the cart table if it exists
DELETE FROM cart WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cart');

-- Delete all data from the payment_account table if it exists
DELETE FROM payment_account WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment_account');

-- Delete all data from the payment table if it exists
DELETE FROM payment WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payment');

-- Delete all data from the product table if it exists
DELETE FROM product WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'product');

-- Delete all data from the "user" table if it exists
DELETE FROM "user" WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user');

-- Delete all data from the session table if it exists
DELETE FROM session WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'session');


-- Drop the cart_product table
DROP TABLE IF EXISTS cart_product CASCADE;

-- Drop the cart table
DROP TABLE IF EXISTS cart CASCADE;

-- Drop the payment_account table
DROP TABLE IF EXISTS payment_account CASCADE;

-- Drop the payment table
DROP TABLE IF EXISTS payment CASCADE;

-- Drop the product table
DROP TABLE IF EXISTS product CASCADE;

-- Drop the "user" table
DROP TABLE IF EXISTS "user" CASCADE;

-- Drop the "user" table
DROP TABLE IF EXISTS session CASCADE;
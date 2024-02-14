-- Delete all data from the cart_product table
DELETE FROM cart_product;

-- Delete all data from the cart table
DELETE FROM cart;

-- Delete all data from the payment_account table
DELETE FROM payment_account;

-- Delete all data from the payment table
DELETE FROM payment;

-- Delete all data from the product table
DELETE FROM product;

-- Delete all data from the "user" table
DELETE FROM "user";

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
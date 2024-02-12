CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20) CHECK (status IN ('active', 'paid', 'shipped', 'complete')),
    time TIMESTAMP
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(255),
    model VARCHAR(255),
    category VARCHAR(255),
    color VARCHAR(255),
    price FLOAT,
    condition VARCHAR(255) CHECK (condition IN ('New', 'Used')),
    description TEXT,
    quantity INTEGER,
    imageUrl TEXT DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpaOexXQpRpu85_Xz8xHnJOL6nycw-pZZ1bezgK1Fp8VptDdBk',
    totalRating INTEGER DEFAULT 0,
    numberRating INTEGER DEFAULT 0
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    name VARCHAR(255) DEFAULT 'No name',
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    salt VARCHAR(255),
    google_id VARCHAR(255)
);

CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255)
);

CREATE TABLE payment_account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create the cart_product table for the many-to-many relationship between cart and product
CREATE TABLE cart_product (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    totalPrice INTEGER,
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Add foreign key constraints for the one-to-many relationships
ALTER TABLE cart ADD COLUMN user_id INTEGER;
ALTER TABLE cart ADD COLUMN payment_account_id INTEGER;

ALTER TABLE cart ADD CONSTRAINT fk_cart_user
    FOREIGN KEY (user_id) REFERENCES "user"(id);

ALTER TABLE cart ADD CONSTRAINT fk_cart_payment_account
    FOREIGN KEY (payment_account_id) REFERENCES payment_account(id);

-- Add foreign key constraints for the many-to-one relationships
ALTER TABLE payment_account ADD COLUMN payment_id INTEGER;
ALTER TABLE payment_account ADD COLUMN user_id INTEGER;

ALTER TABLE payment_account ADD CONSTRAINT fk_payment_account_payment
    FOREIGN KEY (payment_id) REFERENCES payment(id);

ALTER TABLE payment_account ADD CONSTRAINT fk_payment_account_user
    FOREIGN KEY (user_id) REFERENCES "user"(id);
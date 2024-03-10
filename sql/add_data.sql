-- Insert data into the user table
INSERT INTO "user" (id, admin, guest, name, email, password)
VALUES
(1, true, false, 'Cody', 'cody@email.com', '123'),
(2, false, false, 'Murphy', 'murphy@email.com', '123'),
(3, false, false, 'Sam', 'sam@email.com', '123');

-- Insert data into the payment table
INSERT INTO payment (id, type)
VALUES
(1, 'credit card'),
(2, 'paypal'),
(3, 'stripe');

-- Insert data into the product table
-- Insert data into the product table
INSERT INTO product (id, brand, model, category, color, price, condition, description, quantity, imageUrl, totalRating, numberRating)
VALUES
(1, 'Lexus', 'RX350', 'SUV', 'Black', 34500, 'Used', 'The 2020 Lexus RX 350 is a solid entry in the midsize SUV class, offering a roomy and comfortable cabin and typically excellent build quality.', 10, '1.png', 5, 10),
(2, 'Honda', 'Accord', 'Sedan', 'Black', 24700, 'New', 'The 10th-generation Accord was a winner out of the gate in 2018, making us fall in love with Honda''s midsize sedan all over again.', 8, '2.png', 5, 5),
(3, 'Volvo', 'XC90', 'SUV', 'Color', 39000, 'New', 'Step into most any modern luxury car and you''ll find a cabin with enough buttons and switches to make an airline pilot feel right at home.', 9, '3.webp', 4, 9),
(4, 'BMW', 'X5', 'SUV', 'Grey', 54000, 'New', 'It''s easy to see why the 2020 BMW X5 is one of the more appealing midsize luxury SUVs on the market.', 15, '4.webp', 4, 10),
(5, 'Mazda', 'CX-5', 'SUV', 'Black', 28000, 'New', 'Sharp style and sporting performance remain hallmarks of the 2019 Mazda CX-5, a small crossover SUV designed for those who enjoy a spirited drive.', 17, '5.png', 3, 4),
(6, 'BMW', 'S-350', 'Sedan', 'White', 68000, 'Used', 'A performance automobile is a vehicle that is designed specifically for speed.', 12, '6.png', 2, 6),
(7, 'Toyota', 'Corolla', 'Sedan', 'Grey', 20000, 'New', 'The Toyota Corolla is a compact sedan that offers a good value for the money.', 5, '7.webp', 2, 8),
(8, 'Ford', 'F-150', 'Truck', 'White', 35000, 'Used', 'The Ford F-150 is a full-size pickup truck that offers strong towing and hauling capabilities.', 10, '8.png', 5, 9),
(9, 'Chevrolet', 'Tahoe', 'SUV', 'Grey', 45000, 'New', 'The Chevrolet Tahoe is a full-size SUV that offers a spacious and comfortable interior.', 8, '9.webp', 1, 4),
(10, 'Audi', 'A4', 'Sedan', 'Color', 35000, 'New', 'The Audi A4 is a luxury sedan that offers a blend of performance and comfort.', 7, '10.webp', 4, 8),
(11, 'Mercedes-Benz', 'GLE', 'SUV', 'Black', 55000, 'New', 'The Mercedes-Benz GLE is a luxury SUV with a spacious and upscale interior.', 12, '11.png', 2, 7),
(12, 'Hyundai', 'Elantra', 'Sedan', 'Color', 22000, 'New', 'The Hyundai Elantra is a compact sedan that offers a comfortable ride and good fuel economy.', 15, '12.webp', 1, 6),
(13, 'Jeep', 'Wrangler', 'SUV', 'Grey', 32000, 'New', 'The Jeep Wrangler is an iconic off-road SUV known for its rugged capability and open-air driving experience.', 9, '13.webp', 5, 5),
(14, 'Subaru', 'Outback', 'Wagon', 'Color', 28000, 'New', 'The Subaru Outback is a versatile wagon that offers all-wheel drive and a spacious interior.', 11, '14.webp', 3, 9),
(15, 'Tesla', 'Model 3', 'Electric', 'Color', 45000, 'New', 'The Tesla Model 3 is an all-electric sedan that offers impressive range and acceleration.', 8, '15.webp', 4, 10),
(16, 'Kia', 'Sportage', 'SUV', 'Grey', 26000, 'New', 'The Kia Sportage is a compact SUV that offers a comfortable ride and user-friendly features.', 14, '16.png', 2, 8),
(17, 'Nissan', 'Altima', 'Sedan', 'Color', 24000, 'New', 'The Nissan Altima is a midsize sedan that offers a smooth ride and spacious cabin.', 10, '17.png', 4, 7),
(18, 'Ford', 'Mustang', 'Sports Car', 'Color', 40000, 'New', 'The Ford Mustang is an iconic sports car known for its powerful performance and classic design.', 6, '18.webp', 5, 9),
(19, 'Chevrolet', 'Camaro', 'Sports Car', 'Grey', 38000, 'New', 'The Chevrolet Camaro is a classic American muscle car with a powerful engine and sporty handling.', 8, '19.webp', 5, 8)
;


-- Insert data into the paymentAccount table
INSERT INTO payment_account (id, name, payment_id, user_id)
VALUES
(1, 'cc123', 1, 1),
(2, 'paypal123', 2, 1),
(3, 'stripe123', 3, 2),
(4, 'cc456', 1, 2);

-- Insert data into the cart table
INSERT INTO cart (id, status, time, user_id, payment_account_id)
VALUES
(1, 'shipped', '2018-03-25', 1, 1),
(2, 'paid', '2019-08-22', 1, 1),
(3, 'active', '2019-10-15', 1, 2),
(4, 'active', '2019-09-23', 2, 3),
(5, 'shipped', '2019-07-23', 3, 4);

-- Insert data into the cartProduct table
INSERT INTO cart_product (cart_id, product_id, quantity, totalPrice)
VALUES
(1, 1, 2, 69000),
(1, 2, 1, 24700),
(2, 2, 1, 30000),
(3, 4, 1, 54000),
(3, 1, 1, 34500),
(3, 3, 2, 78000),
(4, 5, 1, 28000),
(4, 6, 3, 204000),
(4, 3, 2, 78000);
-- Insert data into the user table
INSERT INTO "user" (id, admin, name, email, password)
VALUES
(1, true, 'Cody', 'cody@email.com', '123'),
(2, false, 'Murphy', 'murphy@email.com', '123'),
(3, false, 'Sam', 'sam@email.com', '123');

-- Insert data into the payment table
INSERT INTO payment (id, type)
VALUES
(1, 'credit card'),
(2, 'paypal'),
(3, 'stripe');

-- Insert data into the product table
INSERT INTO product (id, brand, model, category, color, price, condition, description, quantity, imageUrl, totalRating, numberRating)
VALUES
(1, 'Lexus', 'RX350', 'SUV', 'Black', 34500, 'Used', 'The 2020 Lexus RX 350 is a solid entry in the midsize SUV class, offering a roomy and comfortable cabin and typically excellent build quality.', 10, 'https://www.lexusofrockvillecentre.com/inventoryphotos/7416/2t2bzmca2kc168351/sp/1.jpg?height=400', 50, 10),
(2, 'Honda', 'Accord', 'Sedan', 'Red', 24700, 'New', 'The 10th-generation Accord was a winner out of the gate in 2018, making us fall in love with Honda''s midsize sedan all over again.', 8, 'https://blogmedia.dealerfire.com/wp-content/uploads/sites/1050/2019/04/Radiant-Red-Metallic_o.jpg', 5, 5),
(3, 'Volvo', 'XC90', 'SUV', 'Blue', 39000, 'New', 'Step into most any modern luxury car and you''ll find a cabin with enough buttons and switches to make an airline pilot feel right at home.', 9, 'https://file.kbb.com/kbb/images/content/editorial/slideshow/2016-volvo-xc90-r-design-unveiled/2016-volvo-xc9-r-design-front-static1-600-001.jpg', 36, 9),
(4, 'BMW', 'X5', 'SUV', 'Yellow', 54000, 'New', 'It''s easy to see why the 2020 BMW X5 is one of the more appealing midsize luxury SUVs on the market.', 15, 'https://en.crimerussia.com/upload/iblock/352/BMWX5.jpg', 30, 10),
(5, 'Mazda', 'CX-5', 'SUV', 'White', 28000, 'New', 'Sharp style and sporting performance remain hallmarks of the 2019 Mazda CX-5, a small crossover SUV designed for those who enjoy a spirited drive.', 17, 'https://www.cstatic-images.com/car-pictures/xl/USC80MAS061C021001.jpg', 20, 4),
(6, 'BMW', 'S-350', 'Sedan', 'White', 68000, 'Used', 'A performance automobile is a vehicle that is designed specifically for speed.', 12, 'https://www.autoblog.com/img/research/styles/photos/performance.jpg', 12, 6);

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



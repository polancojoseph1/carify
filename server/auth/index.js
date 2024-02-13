const router = require('express').Router();
const getConnection = require('../db');
const {generateRandomId} = require('../api/utils');

getConnection()
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const { email, password, guestCart } = req.body;
    const userQuery = `
    SELECT * FROM "user"
    WHERE
      email = '${email}' AND
      password = '${password}'
    LIMIT 1`;
    const [user] = await process.postgresql.query(userQuery);
    if (!user) {
      res.status(401).send('Wrong username and/or password');
    } else {
      // ------------------ MERGING ACTIVITY ------------------ //
      const { id: userId } = user;

      const getCartQuery = `
      SELECT * FROM cart
      WHERE
        user_id = ${userId} AND
        status = 'active'
      LIMIT 1
      `

      // SEARCH FOR CART, CREATE ONE IF NOT AVAILABLE
      let [cart] = await process.postgresql.query(getCartQuery);
      if (!cart) {
        const createCartQuery = `
        INSERT INTO cart (
          id,
          status,
          time,
          user_id
        )
        VALUES (
          ${generateRandomId()},
          'active',
          CURRENT_TIMESTAMP,
          ${userId}
        )
        RETURNING *
        `
        cart = await process.postgresql.query(createCartQuery);
        cart = cart[0]
      }
      const { id: cartId } = cart;
      const getCartDetailsQuery = `SELECT * FROM cart_product WHERE cart_id = ${cartId}`
      let cartDetails = await process.postgresql.query(getCartDetailsQuery);

      // IF GUESTCART PRESENT, SEARCH FOR CARTDETAIL AND UPDATE ACCORDINGLY
      if (guestCart) {
        if (cartDetails.length) {
          // EVALUATING EXISTING CART ON UPDATING / CREATING NEW ITEMS
          const prodIdArr = cartDetails.map(prod => prod["product_id"]);
          const promises = guestCart.map(async item => {
            if (prodIdArr.includes(item["product_id"])) {
              // UPDATE EXISTING ITEM IN CART DETAIL
              const updateCartDetailQuery = `
              UPDATE cart_product
              SET
                quantity = quantity + ${item.quantity},
                totalPrice = totalPrice + ${item.totalPrice}
              WHERE
                cart_id = ${item["cart_id"]} AND
                product_id = ${item["product_id"]} 
              LIMIT 1
              RETURNING *
              `
              let targetItem = await process.postgresql.query(updateCartDetailQuery);
              return targetItem;
            } else {
              // CREATE NEW ITEM IN CART DETAIL
              const response = await process.postgresql.query(`
              INSERT INTO cart_product (
                cart_id,
                product_id,
                quantity,
                totalPrice
              )
              VALUES (
                ${item["cart_id"]},
                ${item["product_id"]},
                ${item.quantity},
                ${item.totalPrice}
              )
              RETURNING *
              `);
              return response;
            }
          });
          await Promise.all(promises);
        } else {
          // CREATE EVERY ITEM IN CART DETAIL SINCE ZERO EXISTING ITEMS
          const promises = guestCart.map(async item => {
            const getCartProductQuery = `
            INSERT INTO cart_product (
              cart_id,
              product_id,
              quantity,
              totalPrice
            )
            VALUES (
              ${item["cart_id"]},
              ${item["product_id"]},
              ${item.quantity},
              ${item.totalPrice}
            )
            RETURNING *
            `
            const response = await process.postgresql.query(getCartProductQuery);
            return response;
          });
          await Promise.all(promises);
        }
        cartDetails = await process.postgresql.query(`
        SELECT * FROM cart_product WHERE cart_id = ${ cartId }
        `);
      }

      // SEND UPDATED DATA
      req.login(user, err =>
        err ? next(err) : res.json({user, cart, cartDetails})
      );
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    // CREATE NEW USER AND CART
    const {email, name, password, guestCart} = req.body;
    const userQuery = `
    INSERT INTO "user" (
      id,
      email,
      name,
      password
    )
    VALUES (
      ${generateRandomId()},
      '${email}', 
      '${name}',
      '${password}'
    )
    RETURNING *
    `
    const [user] = await process.postgresql.query(userQuery);
    const cartQuery = `
    INSERT INTO cart (
      id,
      status,
      time,
      user_id
    )
    VALUES (
      ${generateRandomId()},
      'active',
      CURRENT_TIMESTAMP,
      ${user.id}
    )
    RETURNING *
    `
    const [cart] = await process.postgresql.query(cartQuery);

    // IF EXISTING GUEST CART THEN CREATE NEW DETAIL ITEMS IN NEW CART
    if (guestCart) {
      const promises = guestCart.map(async item => {
        const response = await process.postgresql.query(`
        INSERT INTO cart_product (
          id,
          cart_id,
          product_id,
          quantity,
          totalPrice
        )
        VALUES (
          ${generateRandomId()},
          ${cart.id},
          ${item["product_id"]},
          ${item.quantity},
          ${item.totalPrice}
        )
        RETURNING *
        `);
        return response;
      });
      await Promise.all(promises);
    }

    // PULL CART DETAIL
    cartDetails = await process.postgresql.query(`
      SELECT * FROM cart_product WHERE cart_id = ${ cart.id }
    `);

    // SEND UPDATED DATA
    req.login(user, err =>
      err ? next(err) : res.json({user, cart, cartDetails})
    );
  } catch (err) {
    if (err.name === 'SQLUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/guest', async (req, res, next) => {
  try {
    const {paymentId, paymentAccount, cartDetails} = req.body;

    // CREATE NEW USER
    const [user] = await process.postgresql.query(`
    INSERT INTO "user" (
      id,
      name,
      email,
      password
    )
    VALUES (
      ${generateRandomId()},
      'guest',
      '${`guest${generateRandomId()}@email.com`}',
      'guest'
    )
    LIMIT 1
    RETURNING *
    `);

    // CREATE NEW PAYMENT ACCOUNT
    const [guestPayment] = await process.postgresql.query(`
    INSERT INTO payment_account (
      id,
      name,
      payment_id,
      user_id
    )
    VALUES (
      ${generateRandomId()},
      '${paymentAccount}',
      ${paymentId},
      ${user.id}
    )
    RETURNING *
    `);

    // CREATE NEW CART WITH AUTOMATIC PAID STATUS
    const [cart] = await process.postgresql.query(`
    INSERT INTO cart (
      id,
      status,
      time,
      user_id,
      payment_account_id
    )
    VALUES (
      ${generateRandomId()},
      'paid',
      CURRENT_TIMESTAMP,
      ${user.id},
      ${guestPayment.id}
    )
    RETURNING *
    `);
    

    // CREATE NEW DETAIL ITEMS IN NEW CART
    const createPromise = cartDetails.map(async item => {
      const response = await process.postgresql.query(`
      INSERT INTO cart_product (
        id,
        cart_id,
        product_id,
        quantity,
        totalPrice
      )
      VALUES (
        ${generateRandomId()},
        ${cart.id},
        ${item["product_id"]},
        ${item["quantity"]},
        ${item["totalPrice"]}
      )
      RETURNING *
    `);
      return response;
    });
    await Promise.all(createPromise);

    // DECREMENT QUANTITY FROM PRODUCT TABLE
    const updatePromise = cartDetails.map(async item => {
      await process.postgresql.query(`
      UPDATE product 
      SET
        quantity = quantity - ${item.quantity}
      WHERE
        id = ${item["product_id"]}
    `);
    });
    await Promise.all(updatePromise);

    // SEND SUCCESS MESSAGE (NO NEED FOR DATA SINCE WON'T USE)
    res
      .status(200)
      .json({message: 'Guest user and cart managed successfully!'});
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));

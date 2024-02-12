const router = require('express').Router();
// const {isUserOrAdmin} = require('./security');
const getConnection = require('../db');

getConnection()

async function test() {
  const rows = await process.postgresql.query('SELECT * FROM product');
  console.log(rows);
}

router.get('/:userId', async (req, res, next) => {
  // if (req.user.id != req.params.userId) {
  //   res.send('cannot access data');
  // }
  try {
    const userId = req.user.id
    const getQuery = `SELECT * FROM cart WHERE user_id = ${userId}`
    let cart = await process.postgresql.query(getQuery)
    if (!cart.length) {
      const insertQuery = `
      INSERT INTO cart (
        status,
        time,
        user_id
      )
      VALUES (
        'active',
        ${Date()},
        ${req.user.id},
      );`;
      cart = await process.postgresql.query(insertQuery);
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId', async (req, res, next) => {
  try {
    const {status, userId, paymentAccountId} = req.body;

    const insertQuery = `
      INSERT INTO cart (
        status,
        time,
        user_id
        ${paymentAccountId ? ", " + "payment_account_id" : ''}
      )
      VALUES (
        ${status},
        ${Date()},
        ${userId}
        ${paymentAccountId ? ", " + paymentAccountId : ''}
      );`;
    
    newCart = await process.postgresql.query(insertQuery);
    
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
});

router.put('/:cartId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    const getQuery = `SELECT * FROM cart WHERE id = ${cartId}`
    const activeCart = await process.postgresql.query(getQuery);
    const {status, paymentAccountId} = req.body;
    const updateQuery = `
    UPDATE cart
    SET
      status = ${status},
      time = ${Date()},
      payment_account_id = ${
      paymentAccountId
        ? paymentAccountId
      : activeCart['payment_account_id']
      }
    WHERE id = ${cartId}
    `
    const cart = await process.postgresql.query(updateQuery);
    res.status(200).json({cart, message: 'Paid cart successfully!'});
  } catch (error) {
    next(error);
  }
});

module.exports = router;

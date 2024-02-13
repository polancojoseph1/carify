const router = require('express').Router();
const {isUserOrAdmin} = require('./security');
const getConnection = require('../db');
const {generateRandomId} = require('./utils');
const { query } = require('express');

getConnection()

router.get('/:userId', async (req, res, next) => {
  // if (req.user.id != req.params.userId) {
  //   res.send('cannot access data');
  // }
  try {
    const userId = req.params.userId
    const getQuery = `SELECT * FROM cart WHERE user_id = ${userId}`
    let cart = await process.postgresql.query(getQuery)
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId', async (req, res, next) => {
  try {
    const { status, paymentAccountId } = req.body;
    const { userId } = req.params

    const insertQuery = `
      INSERT INTO cart (
        id,
        status,
        time,
        user_id
        ${paymentAccountId ? ", " + "payment_account_id" : ''}
      )
      VALUES (
        ${generateRandomId()},
        '${status}',
        CURRENT_TIMESTAMP,
        ${userId}
        ${paymentAccountId ? ", " + paymentAccountId : ''}
      )
      RETURNING *;`;
    
    newCart = await process.postgresql.query(insertQuery);
    
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
});

router.put('/:cartId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    const {status, paymentAccountId} = req.body;
    const getQuery = `SELECT * FROM cart WHERE id = ${cartId} LIMIT 1`
    const activeCart = await process.postgresql.query(getQuery);
    const updateQuery = `
    UPDATE cart
    SET
      status = '${status}',
      time = CURRENT_TIMESTAMP,
      payment_account_id = ${
      paymentAccountId
        ? paymentAccountId
      : activeCart['payment_account_id']
      }
    WHERE id = ${cartId}
    RETURNING *
    `
    const cart = await process.postgresql.query(updateQuery);
    res.status(200).json({cart, message: 'Paid cart successfully!'});
  } catch (error) {
    next(error);
  }
});

module.exports = router;

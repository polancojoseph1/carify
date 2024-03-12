const router = require('express').Router();
const {isUserOrAdmin} = require('./security');
const {
  getConnection,
  getCartByUserId,
  addCart,
  updateCart,
  updateCartUserId
} = require('../db');
const {generateRandomId} = require('./utils');

getConnection()

router.get('/:userId', async (req, res, next) => {
  // if (req.user.id != req.params.userId) {
  //   res.send('cannot access data');
  // }
  try {
    const userId = req.params.userId;
    let cart = await getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

router.post('/:userId', async (req, res, next) => {
  try {
    const { status, paymentAccountId } = req.body;
    const { userId } = req.params
    newCart = await addCart(generateRandomId(), userId, paymentAccountId, status)
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
});

router.put('/:cartId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    const {status, paymentAccountId} = req.body;
    const cart = await updateCart(cartId, status, paymentAccountId);
    res.status(200).json({cart, message: 'Paid cart successfully!'});
  } catch (error) {
    next(error);
  }
});

router.put('/:cartId/:userId', async (req, res, next) => {
  try {
    const {cartId, userId} = req.params
    const cart = await updateCartUserId(cartId, userId);
    res.status(200).json({cart, message: 'Paid cart successfully!'});
  } catch (error) {
    next(error);
  }
});

module.exports = router;

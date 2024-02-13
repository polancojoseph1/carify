const router = require('express').Router();
const getConnection = require('../db');

getConnection()

router.get('/', async (req, res, next) => {
  try {
    const cartDetails = await process.postgresql.query(`SELECT * FROM cart_product`);
    res.status(200).json(cartDetails);
  } catch (error) {
    next(error);
  }
});

router.get('/:cartId', async (req, res, next) => {
  try {
    const cartDetail = await process.postgresql.query(`
    SELECT * FROM cart_product WHERE cart_id = ${ req.params.cartId } LIMIT 1
    `);
    res.status(200).json(cartDetail);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {cartId, productId, quantity, totalPrice} = req.body;
    const newOrder = await process.postgresql.query(`
    INSERT INTO cart_product (
      cart_id,
      product_id,
      quantity,
      totalPrice
    )
    VALUES (
      ${cartId},
      ${productId},
      ${quantity},
      ${totalPrice}
    )
    RETURNING *
    `);
    res
      .status(200)
      .json({newOrder, message: 'Added new cart item successfully!'});
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const {
      cartId,
      productId,
      quantity: newQuantity,
      totalPrice: newPrice
    } = req.body;
    const order = await process.postgresql.query(`
    UPDATE cart_product 
    SET
      quantity = quantity + ${newQuantity},
      totalPrice = totalPrice + ${newPrice}
    WHERE
      cart_id = ${cartId} AND
      product_id = ${productId}
    RETURNING *
    `);
    res.status(200).json({order, message: 'Edited cart item successfully!'});
  } catch (error) {
    next(error);
  }
});

router.delete('/:cartId/:productId', async (req, res, next) => {
  try {
    await process.postgresql.query(`
    DELETE FROM cart_product
    WHERE
      cart_id = ${req.params.cartId} AND
      product_id = ${req.params.productId}
    `);
    res
      .status(200)
      .json({message: 'Deleted cart item successfully!'});
  } catch (error) {
    next(error);
  }
});

module.exports = router;

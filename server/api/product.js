const router = require('express').Router();
// const {isAdmin} = require('./security');
const getConnection = require('../db');

getConnection()


router.get('/', async (req, res, next) => {
  try {
    const products = await process.postgresql.query('SELECT * FROM product');
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const query = `SELECT * FROM product WHERE id = ${req.params.id}`
    const selectedProduct = await process.postgresql.query(query);
    res.status(200).json(selectedProduct);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const { productId, quantity: quantityBought } = req.body;
    const getQuery = `SELECT * FROM product WHERE id = ${productId}`
    const product = await process.postgresql.query(getQuery);
    const updateQuery = `
    UPDATE product
    SET quantity = ${product.quantity - quantityBought} 
    WHERE id = ${productId}
    `
    await process.postgresql.query(updateQuery)
    res.status(200).json({message: 'Edited products successfully!'});
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      brand,
      model,
      category,
      color,
      price,
      condition,
      description,
      quantity,
      imageUrl
    } = req.body;
    const query = `
    INSERT INTO product (
      brand, 
      model, 
      category, 
      color, 
      price, 
      condition, 
      description, 
      quantity, 
      imageUrl, 
      totalRating, 
      numberRating
    )
    VALUES (
      ${brand}, 
      ${model}, 
      ${category}, 
      ${color}, 
      ${price}, 
      ${condition}, 
      ${description}, 
      ${quantity}, 
      ${imageUrl}, 
      ${totalRating}, 
      ${numberRating}
    );`;
    const newProduct = await process.postgresql.query(query)
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const router = require('express').Router();
const {isAdmin} = require('./security');
const {
  getConnection,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct
} = require('../db');
const { generateRandomId } = require('./utils');

getConnection()


router.get('/', async (req, res, next) => {
  try {
    const products = getAllProducts()
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = getProductById(req.params.id);
    res.status(200).json(product);
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
      imageUrl,
      totalRating,
      numberRating
    } = req.body;
    const newProduct = addProduct(
      generateRandomId(),
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
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id
    const { quantityBought } = req.body;
    updateProduct(id, quantityBought)
    res.status(200).json({message: 'Edited products successfully!'});
  } catch (err) {
    next(err);
  }
});

module.exports = router;

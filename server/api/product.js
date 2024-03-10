const router = require('express').Router();
const {isAdmin} = require('./security');
const {
  getConnection,
  getAllProducts,
  getProductsByColor,
  getProductsByRating,
  getProductsByPrice,
  getProductById,
  addProduct,
  updateProduct
} = require('../db');
const { generateRandomId } = require('./utils');

getConnection()


router.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts()
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/color/:color', async (req, res, next) => {
  try {
    const { color } = req.params
    const products = await getProductsByColor(color)
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/top', async (req, res, next) => {
  try {
    const products = await getProductsByRating()
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/price', async (req, res, next) => {
  try {
    const products = await getProductsByPrice()
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
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
    const newProduct = await addProduct(
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
    await updateProduct(id, quantityBought)
    res.status(200).json({message: 'Edited products successfully!'});
  } catch (err) {
    next(err);
  }
});

module.exports = router;

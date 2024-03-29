const router = require('express').Router();
const {
  getConnection,
  getAllCartProducts,
  getCartProductsByCartId,
  getCartProductByCartIdAndProductId,
  addCartProduct,
  updateCartProductAdd,
  updateCartProductChange,
  deleteCartProduct
} = require('../db');
const { generateRandomId } = require('./utils')

getConnection()

router.get('/', async (req, res, next) => {
  try {
    const cartProducts = await getAllCartProducts();
    res.status(200).json(cartProducts);
  } catch (error) {
    next(error);
  }
});

router.get('/:cartId', async (req, res, next) => {
  try {
    const cartProducts = await getCartProductsByCartId(req.params.cartId);
    res.status(200).json(cartProducts);
  } catch (error) {
    next(error);
  }
});

router.get('/:cartId/:productId', async (req, res, next) => {
  try {
    const {
      cartId,
      productId
    } = req.params
    const cartProduct = await getCartProductByCartIdAndProductId(cartId, productId);
    res.status(200).json(cartProduct);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {cartId, productId, quantity, totalPrice} = req.body;
    const cartProduct = await addCartProduct(generateRandomId(), cartId, productId, quantity, totalPrice)
    res
      .status(200)
      .json({cartProduct, message: 'Added new cart item successfully!'});
  } catch (error) {
    next(error);
  }
});

router.put('/add', async (req, res, next) => {
  try {
    const {
      cartId,
      productId,
      addedQuantity,
      addedPrice
    } = req.body;
    const cartProduct = await updateCartProductAdd(cartId, productId, addedQuantity, addedPrice)
    res.status(200).json({cartProduct, message: 'Edited cart item successfully!'});
  } catch (error) {
    next(error);
  }
});

router.put('/change/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const {
      changedQuantity,
      changedPrice
    } = req.body;
    const cartProduct = await updateCartProductChange(id, changedQuantity, changedPrice)
    res.status(200).json({cartProduct, message: 'Edited cart item successfully!'});
  } catch (error) {
    next(error);
  }
});

router.delete('/:cartId/:productId', async (req, res, next) => {
  try {
    const { cartId, productId } = req.params;
    const deletedCartProduct = await deleteCartProduct(cartId, productId)
    if (deletedCartProduct.length) {
      message = 'Deleted cart item successfully!'
    } else {
      message = 'Item to delete not found!'
    }
    res.status(200).json({message: message});
  } catch (error) {
    next(error);
  }
});

module.exports = router;

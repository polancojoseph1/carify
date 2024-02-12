const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/payment', require('./payment'));
router.use('/payment-account', require('./paymentAccount'));
router.use('/product', require('./product'));
router.use('/cart', require('./cart'));
router.use('/cart-product', require('./cartProduct'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
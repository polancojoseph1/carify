const router = require('express').Router();
const {generateRandomId} = require('./utils');
const {
  getConnection,
  getAllPayments,
  getPaymentById,
  addPayment,
  updatePayment,
  deletePayment
} = require('../db');

getConnection()


router.get('/', async (req, res, next) => {
  try {
    const allPayments = await getAllPayments;
    if (allPayments) {
      res.json(allPayments);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const payment = await getPaymentById(id);
    if (payment) {
      res.json(payment);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newPayment = await addPayment(generateRandomId(), req.body.type);
    if (newPayment) {
      res.json(newPayment);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await updatePayment(req.params.id, req.body.type);
    res.json({message: 'Payment successfully updated'});
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const payment = await deletePayment(req.params.id)
    if (payment) {
      res.json(payment);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

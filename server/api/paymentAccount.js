const router = require('express').Router();
// const stripe = require('./stripe');
const {
  getConnection,
  getAllPaymentAccountsJoinPayment,
  getPaymentAccountById,
  addPaymentAccount,
  updatePaymentAccount,
  deletePaymentAccount
} = require('../db');
const {generateRandomId} = require('./utils')

getConnection()

// const postStripeCharge = res => (stripeErr, stripeRes) => {
//   if (stripeErr) {
//     res.status(500).send({error: stripeErr});
//   } else {
//     res.status(200).send({success: stripeRes});
//   }
// };

// router.get('/stripe', (req, res) => {
//   res.send({message: 'Stripe Server'});
// });

// router.post('/stripe', (req, res) => {
//   stripe.charges.create(req.body, postStripeCharge(res));
// });

router.get('/', async (req, res, next) => {
  try {
    const allPaymentAccounts = await getAllPaymentAccountsJoinPayment();
    if (allPaymentAccounts) {
      res.json(allPaymentAccounts);
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
    const paymentAccount = await getPaymentAccountById(id)
    if (paymentAccount) {
      res.json(paymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {name, paymentId, userId} = req.body;
    const newPaymentAccount = await addPaymentAccount(
      generateRandomId(),
      name,
      paymentId,
      userId
    )
    if (newPaymentAccount) {
      res.json(newPaymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    paymentAccount = await updatePaymentAccount(req.params.id, req.body.name)
    res.json(paymentAccount);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedPaymentAccount = await deletePaymentAccount(id)
    if (deletedPaymentAccount) {
      res.json(deletedPaymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

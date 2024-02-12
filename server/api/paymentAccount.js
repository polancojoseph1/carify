const router = require('express').Router();
// const stripe = require('./stripe');
const getConnection = require('../db');

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
    const joinQuery = `
      SELECT pa.*, p.*
      FROM payment_account pa
      LEFT JOIN payment p ON pa.payment_id = p.id;
    `
    const allPaymentAccounts = await process.postgresql.query(joinQuery);
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
    const paymentAccount = await process.postgresql.query(`
    SELECT * FROM payment_account
    WHERE
     id = ${id}
    `);
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
    const newPaymentAccount = await process.postgresql.query(`
    INSERT INTO payment_account (
      name,
      payment_id,
      user_id
    )
    VALUES (
      ${name},
      ${paymentId},
      ${userId}
    )
    `);
    if (newPaymentAccount) {
      res.json(newPaymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const paymentAccountId = req.params.id;
    const paymentAccount = await process.postgresql.query(`
    DELETE FROM payment_account
    WHERE id = ${paymentAccountId}
    `);
    if (paymentAccount) {
      await paymentAccount.destroy();
      res.json(paymentAccount);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const paymentAccount = await PaymentAccount.findByPk(req.params.id);
    paymentAccount.type = req.body.type;
    paymentAccount.name = req.body.name;


    await process.postgresql.query(`
    UPDATE payment_account
    SET
      type = ${req.body.type},
      name = ${req.body.name}
    WHERE
      id = ${eq.params.id}
    `);

    await paymentAccount.save();
    res.json(paymentAccount);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

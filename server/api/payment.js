const router = require('express').Router();
const {generateRandomId} = require('./utils');
const getConnection = require('../db');

getConnection()


router.get('/', async (req, res, next) => {
  try {
    const allPayments = await process.postgresql.query('SELECT * FROM payment');
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
    const query = `SELECT * FROM payment WHERE id = ${id} LIMIT 1`
    const payment = await process.postgresql.query(query);
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
    const query = `INSERT INTO payment (
      id,
      type
    )
    VALUES (
      ${generateRandomId()},
      '${req.body.type}'
    )
    RETURNING *;`;
    const newPayment = await process.postgresql.query(query);
    if (newPayment) {
      res.json(newPayment);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const payment = await process.postgresql.query(`DELETE FROM payment WHERE id = ${req.params.id} RETURNING *;`)
    if (payment) {
      res.json(payment);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const query = `
    UPDATE payment
    SET type = '${req.body.type}' 
    WHERE id = ${req.params.id}
    `

    await process.postgresql.query(query);
    res.json({message: 'Payment successfully updated'});
  } catch (error) {
    next(error);
  }
});

module.exports = router;

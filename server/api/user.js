const router = require('express').Router();
// const {isAdmin} = require('./security');
const getConnection = require('../db');

getConnection()

async function test() {
  const rows = await process.postgresql.query('SELECT * FROM product');
  console.log(rows);
}

router.get('/', async (req, res, next) => {
  try {
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    const query = `SELECT id, email, name FROM "user";`
    const user = await process.postgresql.query(query);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const query = `
    UPDATE "user" 
    SET
      email = ${email}, 
      name = ${name}
    WHERE
      id = ${id};
    `
    const user = await process.postgresql.query(query);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
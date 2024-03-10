const router = require('express').Router();
const {isAdmin} = require('./security');
const {
  getConnection, 
  getAllUsers,
  getUserById,
  updateUser
} = require('../db');

getConnection()

router.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    const user = await updateUser(id, name, email);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
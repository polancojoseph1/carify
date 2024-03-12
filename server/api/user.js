const router = require('express').Router();
const {isAdmin} = require('./security');
const {
  getConnection, 
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  signUpUser,
  guestUser
} = require('../db');
const {generateRandomId} = require('./utils');

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

router.post('/login', async (req, res, next) => {
  try {
    // Login existing user
    getConnection()
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    if (!user) {
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err =>
        err ? next(err) : res.json({user})
      );
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    // Create new user
    getConnection()
    const {email, name, password} = req.body;
    const user = await signUpUser(generateRandomId(), email, name, password);

    req.login(user, err =>
      err ? next(err) : res.json({user})
    );
  } catch (err) {
    if (err.constraint === 'user_email_key') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/guest', async (req, res, next) => {
  try {
    // Create guest user
    getConnection()
    const user = await guestUser(generateRandomId(), generateRandomId())

    req.login(user, err =>
      err ? next(err) : res.json({message: 'Guest user managed successfully!', user})
    )
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      }
      res.send({"message": "Successfully logged out!"})
    });
  });
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

module.exports = router;
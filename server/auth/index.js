const router = require('express').Router();
const {
  getConnection, 
  loginUser,
  signUpUser,
  guestUser
} = require('../db');
const {generateRandomId} = require('../api/utils');
getConnection()

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    // Login existing user
    const { email, password } = req.body;
    const user = loginUser(email, password);
    if (!user) {
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err =>
        err ? next(err) : res.json({user, cart})
      );
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    // Create new user
    const {email, name, password} = req.body;
    const user = await signUpUser(generateRandomId(), email, name, password);

    console.log(user,"user <-------------")

    req.login(user, err =>
      err ? next(err) : res.json({user, cart})
    );
  } catch (err) {
    console.log(err.constraint, "<------------- error info")
    if (err.name === 'SQLUniqueConstraintError') { // Check this and change error name
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/guest', async (req, res, next) => {
  try {
    // Create guest user
    const user = guestUser(generateRandomId(), generateRandomId())

    res
      .status(200)
      .json({message: 'Guest user and cart managed successfully!', user});
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));

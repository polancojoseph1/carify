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

router.use('/google', require('./google'));

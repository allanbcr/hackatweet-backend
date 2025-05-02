var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody')

const bcrypt = require('bcrypt');
const uid2 = require('uid2');

const hash = bcrypt.hashSync('password', 10);

/* GET users listing. */
router.get('/', (req, res) => {
  User.find().then((data) => {
    res.json({ result: true, users: data.users })
  });
});

// GET specifiq user
router.get('/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    res.json({ result: true, user: data })
  })
})

// POST : Creating new user
router.post('/signUp', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty field' })
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32),
        likes: 0,
        tweets: []
      })

      newUser.save().then(newDoc => {
        res.json({ result: true, message: "new user created" })
      })
    } else {
      res.json({ result: false, error: "Already existing User" })
    }
  });
});

// POST : SignIn - user connection 
router.post('/signIn', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'missing or empty field' })
  } else {
    res.json({ result: true, message: 'user connected' })
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token })
    } else {
      res.json({ result: false, error: 'User not found or wrong field(s)' })
    }
  })
})

module.exports = router;

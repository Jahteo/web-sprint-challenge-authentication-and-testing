const router = require('express').Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const configs = require("../api/configs");
const Users = require("./auth-model");
const { isValid } = require("./auth-services");

router.post('/register', (req, res) => {
  const credentials = req.body;
  if(isValid(credentials)){
    const rounds = process.env.BCRYPT_ROUNDS || 4;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    Users.add(credentials)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create new user" })
      })
  } else {
    res.status(400).json({ message: "please provide a username and alphanumeric password"})
  }
});

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (isValid(req.body)) {
//     Users.findById({ username: username })
//       .then(([user]) => {
//         console.log(user)
//         if()
//       })
//   }
// });

module.exports = router;

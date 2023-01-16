const loginRouter = require('express').Router()

const passport = require("passport")
require("../models/passportConfig")(passport)

loginRouter.post('/signup', 
  passport.authenticate("local-signup"), // add { session: false } argument to disable sessions
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
)

loginRouter.post('/login', 
  passport.authenticate("local-login"), // add { session: false } argument to disable sessions
  (req, res, next) => {
    res.json({ user: req.user });
  }
)

module.exports = loginRouter
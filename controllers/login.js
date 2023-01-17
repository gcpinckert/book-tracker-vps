const loginRouter = require('express').Router()

const passport = require("passport")
require("../models/passportConfig")(passport)

loginRouter.get('/signup', (req, res, next) => {
  res.render('signup');
})

loginRouter.post('/signup', 
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/auth/signup",
  }), // add { session: false } argument to disable sessions
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
)

loginRouter.get('/login', (req, res, next) => {
  res.render('login')
})

loginRouter.post('/login', 
  passport.authenticate("local-login", {
    // successRedirect: "/",
    // failureRedirect: "/auth/login",
  }), // add { session: false } argument to disable sessions
  (req, res, next) => {
    res.json({ user: req.user });
  }
)

loginRouter.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {return next(err)}
    res.redirect('/');
  })
})

module.exports = loginRouter
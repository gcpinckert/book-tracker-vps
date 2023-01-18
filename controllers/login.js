const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const loginRouter = require('express').Router()
const { usernameExists, createUser, matchPassword } = require('../models/user')


// const passport = require("passport")
// require("../models/passportConfig")(passport)

loginRouter.post('/signup', async (req, res, next) => {
  const { username, password } = req.body

  const userExists = await usernameExists(username)
  if (userExists) {
    return res.status(400).json({
      error: 'username already exists'
    })
  }

  const user = await createUser(username, password)
  if (!user) {
    return res.status(400).json({
      error: 'could not add new user'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, config.SESSION_SECRET)

  res.status(200).send({
    token,
    username: user.username,
    id: user.id
  })

}
  // passport.authenticate("local-signup", {
  //   successRedirect: "/",
  //   failureRedirect: "/auth/signup",
  // }), // add { session: false } argument to disable sessions
  // (req, res, next) => {
  //   res.json({
  //     user: req.user,
  //   });
  // }

)

loginRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  const user = await usernameExists(username)
  if (!user) {
    return res.status(401).json({
      error: 'no such username'
    })
  }

  const isMatch = await matchPassword(password, user.password)
  if (!isMatch) {
    return res.status(401).json({
      error: 'incorrect password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, config.SESSION_SECRET)

  res.status(200).send({
    token,
    username: user.username,
    id: user.id
  })
}
  // passport.authenticate("local-login", {
  //   // successRedirect: "/",
  //   // failureRedirect: "/auth/login",
  // }), // add { session: false } argument to disable sessions
  // (req, res, next) => {
  //   res.json({ user: req.user });
  // }
)

// loginRouter.post('/logout', (req, res, next) => {
//   req.logout((err) => {
//     if (err) {return next(err)}
//     res.redirect('/');
//   })
// })

module.exports = loginRouter
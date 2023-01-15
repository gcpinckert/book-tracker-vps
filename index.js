const express = require('express')
const app = express()
const config = require('./utils/config');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const passport = require("passport")
require("./models/passportConfig")(passport)

app.get('/', (req, res) => {
  res.send('<h1>WORKING!</h1>')
})

app.post('/auth/signup', 
  passport.authenticate("local-signup", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
)

app.post('/auth/login', 
  passport.authenticate("local-login", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
)


app.listen(config.PORT, () => {
  console.log(`We're up and running on port ${config.PORT} \\(^ヮ^)/`)
})
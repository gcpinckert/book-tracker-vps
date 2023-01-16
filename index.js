const config = require('./utils/config')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const session = require('express-session')
const pgStore = require('connect-pg-simple')(session)
const passport = require('passport')
const loginRouter = require('./controllers/login')
const booksRouter = require('./controllers/books')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: config.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new pgStore({
    conString: config.PSQL_CONNECTION_STRING,
  }),
  cookie: { maxAge: 14 * 24 * 60 * 60}
}));
app.use(passport.authenticate('session'));
app.use('/auth', loginRouter)
app.use('/api/books', booksRouter)


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(config.PORT, () => {
  console.log(`We're up and running on port ${config.PORT} \\(^ヮ^)/`);
})
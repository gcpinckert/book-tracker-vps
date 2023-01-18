const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const loginRouter = require('./controllers/login')
const booksRouter = require('./controllers/books')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(cors())
// TODO app.use(express.static('build'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)


app.use('/auth', loginRouter)
app.use('/api/books', booksRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  console.log(`We're up and running on port ${config.PORT} \\(^ヮ^)/`);
})
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const loginRouter = require('./controllers/login')
const booksRouter = require('./controllers/books')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongo = require('./models/mgdb')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

app.use('/auth', loginRouter)
app.use('/api/books', booksRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  logger.info(`We're up and running on port ${config.PORT} \\(^ヮ^)/`);
})
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')
const booksRouter = require('./controllers/books')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth', loginRouter)
app.use('/api/books', booksRouter)

app.get('/', (req, res) => {
  res.send('<h1>WORKING!</h1>')
})

app.listen(config.PORT, () => {
  console.log(`We're up and running on port ${config.PORT} \\(^ヮ^)/`);
})
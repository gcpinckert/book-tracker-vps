const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>WORKING!</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`We're up and running on port ${PORT} \\(^ヮ^)/`)
})
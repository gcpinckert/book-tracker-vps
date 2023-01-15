require('dotenv').config()

const PORT = process.env.PORT
const PSQL_PASS = process.env.PSQL_PASS

module.exports = {
  PSQL_PASS,
  PORT
}
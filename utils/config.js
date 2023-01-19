require('dotenv').config()

const PORT = process.env.PORT
const PSQL_PASS = process.env.PSQL_PASS
const PSQL_CONNECTION_STRING = process.env.PSQL_CONNECTION_STRING
const SESSION_SECRET = process.env.SESSION_SECRET
const MONGO_URI = process.env.MONGODB_URI

module.exports = {
  PSQL_PASS,
  PORT,
  PSQL_CONNECTION_STRING,
  SESSION_SECRET,
  MONGO_URI
}
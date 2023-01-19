const config = require('../utils/config')
const { MongoClient } = require("mongodb")

const uri = config.MONGO_URI

const client = new MongoClient(uri)
const database = client.db('books_tracker')
const books = database.collection('books')

const mongodb = {
  add: async (bookDetails) => {
    const result = await books.insertOne(bookDetails)
    return result.insertedId
  },

  read: async (psqlId) => {
    const query = { psqlId }
    const book = await books.findOne(query);
    return book
  },

  getAll: async () => {
    const list = await books.find({}).toArray()
    return list
  },

  remove: async (psqlId) => {
    const query = { psqlId }
    const result = await books.deleteOne(query);
    return result.deletedCount === 1
  },
}

module.exports = mongodb

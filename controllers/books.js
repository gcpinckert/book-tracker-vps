const booksRouter = require('express').Router()
const { response } = require('express')
const jwt = require('jsonwebtoken')
const books = require('../models/books')
const details = require('../models/details')
const mongodb = require('../models/mgdb')
const config = require('../utils/config')
const { findUserById } = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }

  return null
}

booksRouter.get('/', async (req, res, next) => {
  const booksList = await books.getAll()
  res.json(booksList)
});

booksRouter.get('/:bookId', async (req, res, next) => {
  const book = await books.get(req.params.bookId)
  if (book) {
    res.json(book)
  } else {
    res.status(404).send()
  }
});

booksRouter.get('/:bookId/cover', async (req, res, next) => {
  const bookDetails = await mongodb.read(Number(req.params.bookId))
  if (bookDetails) {
    const coverUrl = `https://covers.openlibrary.org/b/id/${bookDetails.topResults[0].cover_i}-S.jpg`
    res.send(coverUrl)
  } else {
    res.status(404).send()
  }
  
})

booksRouter.post('/', async (req, res, next) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, config.SESSION_SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await findUserById(decodedToken.id)

  const book = {
    title: body.title,
    author: body.author,
    description: body.description || '',
    rating: body.rating || 0,
    user_id: user.id,
  }

  const newDetails = {}
  newDetails.topResults = await details.getSearchByTitleResults(book.title)
  if (newDetails) {
    newDetails.description = await details.getDescription(newDetails.topResults[0])
  }
  

  const newBook = await books.add(book)
  if (newBook) {
    newDetails.psqlId = newBook.id
    mongodb.add(newDetails)
    res.json(newBook)
  } else {
    res.status(400).send()
  }
});

booksRouter.delete('/:bookId', async (req, res, next) => {
  try {
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, config.SESSION_SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  } catch (err) {
    next(err)
  }
  const success = await books.delete(req.params.bookId)
  await books.remove(Number(req.params.bookId))

  if (success) {
    res.status(204).end()
  } else {
    res.status(400).send()
  }
});

booksRouter.put('/:bookId', async (req, res, next) => {
  const body = req.body

  const edits = {
    id: req.params.bookId,
    ...body
  }

  const newBook = await books.update(edits)

  if (newBook) {
    res.json(newBook)
  } else {
    res.status(400).send()
  }
});

module.exports = booksRouter
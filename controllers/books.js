const booksRouter = require('express').Router()
const books = require('../models/books')

booksRouter.get('/', async (req, res, next) => {
  const booksList = await books.getAll()
  if (booksList) {
    res.json(booksList)
  } else {
    res.send('<p>No books yet!</p>')
  }
});

booksRouter.get('/:bookId', async (req, res, next) => {
  const book = await books.get(req.params.bookId)
  if (book) {
    res.json(book)
  } else {
    res.status(404).send()
  }
});

booksRouter.post('/', async (req, res, next) => {
  const body = req.body

  const book = {
    title: body.title,
    author: body.author,
    description: body.description || '',
    rating: body.rating || 0,
  }

  const newBook = await books.add(book)
  if (newBook) {
    res.json(newBook)
  } else {
    res.status(400).send()
  }
});

booksRouter.delete('/:bookId', async (req, res, next) => {
  const success = await books.delete(req.params.bookId)

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
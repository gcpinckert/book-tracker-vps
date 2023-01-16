const booksRouter = require('express').Router()
const books = require('../models/books')

booksRouter.get('/:userId', async (req, res, next) => {
  const usersBooks = await books.getAll(req.params.userId)
  if (usersBooks) {
    res.json(usersBooks)
  } else {
    res.send('<p>No books yet!</p>')
  }
});

booksRouter.post('/:userId', async (req, res, next) => {
  const body = req.body

  const book = {
    userId: req.params.userId,
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
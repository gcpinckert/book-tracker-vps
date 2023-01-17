# Book Tracker

A simple CRUD app for tracking books I have read.

## Login Routes

- get: `/auth/login` currently renders template view, we're going to switch to React frontend
- post: `/auth/login` authenticates and logs in a user, using sessions, switch to token based
- get: `/auth/signup` currently renders template view, we're going to switch to React frontend
- post: `/auth/signup` adds new username and password to the db

## API

- get: `/api/books/` returns all books as JSON <- need a way to associate user id
- get: `/api/books/:bookId` returns single book information
- post: `/api/books/` adds a book to the list of books <- need a way to associate user id
  ```json
  // book information required in body:
  {
    "title": "Some Title",
    "author": "John Doe",
    "description": "A book about a boy who finds home.", // or empty string if no description
    "rating": 1 // integer value 1-5 or 0 for no rating
  }
- delete: `/api/books/:bookId` removes the specified book from the DB
- put: `/api/books/:bookId` updates the specified book in the DB with the given details
  ```json
  {
    "title": "Boy Going Home",
    "author": "Johnny Doe"
  }
  ```

const client = require("./db.js")

const books = {
  getAll: async () => {
    const data = await client.query('SELECT * FROM books;')
    
    if (data.rowCount = 0) return false
    return data.rows;
  },

  get: async(bookId) => {
    const data = await client.query('SELECT * FROM books WHERE id = $1', [bookId]);

    if (data.rowCount = 0) return false
    return data.rows[0];

  },

  add: async ({title, author, description, rating}) => {
    const data = await client.query(
      'INSERT INTO books (title, author, description, rating) VALUES($1, $2, $3, $4) RETURNING id, title;', 
      [title, author, description, rating]
    )

    if (data.rowCount == 0) return false
    return data.rows[0]
  },

  update: async (newBookDetails) => {
    const data = await books.get(newBookDetails.id);
    if (!data) return false

    updates = {}
    Object.keys(data).forEach(key => {
      if (newBookDetails.hasOwnProperty(key)) {
        updates[key] = newBookDetails[key]
      } else {
        updates[key] = data[key]
      }
    })
    
    const newData = await client.query(
      'UPDATE books SET title = $1, author = $2, description = $3, rating = $4 WHERE id = $5 RETURNING id, title;',
      [updates.title, updates.author, updates.description, updates.rating, updates.id]
    )

    if (newData.rowCount == 0) return false
    return updates
  },

  delete: async (bookId) => {
    const data = await client.query('DELETE FROM books WHERE id = $1', [bookId])

    if (data.rowCount == 0) return false
    return true
  },
}

module.exports = books

// const getBooks = async (userId) => {
//   const data = await client.query('SELECT * FROM books WHERE user_id = $1', [userId])
  
//   if (data.rowCount = 0) return false
//   return data.rows;
// }

// const getBook = async(bookId) => {
//   const data = await client.query('SELECT * FROM books WHERE id = $1', [bookId]);

//   if (data.rowCount = 0) return false
//   return data.rows[0];

// }

// const addBook = async ({title, author, userId, description, rating}) => {
//   const data = await client.query(
//     'INSERT INTO books (title, author, user_id, description, rating) VALUES($1, $2, $3, $4, $5) RETURNING id, title;', 
//     [title, author, userId, description, rating]
//   )

//   if (data.rowCount == 0) return false
//   return data.rows[0]
// }

// const updateBook = async (newBookDetails) => {
//   const data = await getBook(newBookDetails.id);
//   if (!data) return false

//   updates = {}
//   Object.keys(data).forEach(key => {
//     if (newBookDetails.hasOwnProperty(key)) {
//       updates[key] = newBookDetails[key]
//     } else {
//       updates[key] = data[key]
//     }
//   })
  
//   const newData = await client.query(
//     'UPDATE books SET title = $1, author = $2, description = $3, rating = $4 WHERE id = $5 RETURNING id, title;',
//     [updates.title, updates.author, updates.description, updates.rating, updates.id]
//   )

//   if (newData.rowCount == 0) return false
//   return updates
// }

// const deleteBook = async (bookId) => {
//   const data = await client.query('DELETE FROM books WHERE id = $1', [bookId])

//   if (data.rowCount == 0) return false
//   return true
// }

// module.exports = { getBooks, addBook, updateBook, deleteBook }
const db = require('../database');

const getAllBooks = (callback) => {
  const sql = `
    SELECT books.id, books.title, books.quantity, authors.name as author
    FROM books
    JOIN authors_books ON books.id = authors_books.book_id
    JOIN authors ON authors_books.author_id = authors.id;
  `;
  db.all(sql, [], callback);
};

const getBookById = (id, callback) => {
  const sql = `
    SELECT books.id, books.title, books.quantity, authors.name as author
    FROM books
    JOIN authors_books ON books.id = authors_books.book_id
    JOIN authors ON authors_books.author_id = authors.id
    WHERE books.id = ?;
  `;
  db.get(sql, [id], callback);
};

const createBook = (title, quantity, authorIds, callback) => {
  const sql = 'INSERT INTO books (title, quantity) VALUES (?, ?)';
  db.run(sql, [title, quantity], function(err) {
    if (err) {
      return callback(err);
    }
    const bookId = this.lastID;
    const authorSql = 'INSERT INTO authors_books (book_id, author_id) VALUES (?, ?)';
    authorIds.forEach(authorId => {
      db.run(authorSql, [bookId, authorId]);
    });
    callback(null, { id: bookId });
  });
};

const updateBook = (id, title, authorIds, callback) => {
  const sql = 'UPDATE books SET title = ? WHERE id = ?';
  db.run(sql, [title, id], function(err) {
    if (err) {
      return callback(err);
    }
    const deleteAuthorSql = 'DELETE FROM authors_books WHERE book_id = ?';
    db.run(deleteAuthorSql, [id], (err) => {
      if (err) {
        return callback(err);
      }
      const authorSql = 'INSERT INTO authors_books (book_id, author_id) VALUES (?, ?)';
      authorIds.forEach(authorId => {
        db.run(authorSql, [id, authorId]);
      });
      callback(null, { id });
    });
  });
};

const deleteBook = (id, callback) => {
  const sql = 'DELETE FROM books WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id });
  });
};

const getBookQuantity = (id, callback) => {
  const sql = `
    SELECT books.quantity, COUNT(borrowed_books.book_id) as borrowed
    FROM books
    LEFT JOIN borrowed_books ON books.id = borrowed_books.book_id
    WHERE books.id = ?;
  `;
  db.get(sql, [id], callback);
};

const updateBookQuantity = (id, quantity, callback) => {
  const sql = 'UPDATE books SET quantity = ? WHERE id = ?';
  db.run(sql, [quantity, id], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id });
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBookQuantity,
  updateBookQuantity,
};
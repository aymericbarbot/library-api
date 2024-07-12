const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/recherche/:mots', (req, res) => {
  const { mots } = req.params;
  const searchQuery = `%${mots}%`;
  const sql = `
    SELECT books.id, books.title, authors.name as author
    FROM books
    JOIN authors_books ON books.id = authors_books.book_id
    JOIN authors ON authors_books.author_id = authors.id
    WHERE books.title LIKE ? OR authors.name LIKE ?
    ORDER BY (CASE
      WHEN books.title LIKE ? THEN 1
      WHEN authors.name LIKE ? THEN 2
      ELSE 3
    END) ASC;
  `;
  db.all(sql, [searchQuery, searchQuery, searchQuery, searchQuery], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
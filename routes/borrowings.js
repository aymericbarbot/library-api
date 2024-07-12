const express = require('express');
const router = express.Router();
const Borrowing = require('../models/borrowing');
const Book = require('../models/book');

router.post('/emprunt', (req, res) => {
  const { bookId, personEmail } = req.body;
  if (!bookId || !personEmail) {
    return res.status(400).json({ error: 'Les informations de l\'emprunt sont incomplètes.' });
  }
  Book.getBookQuantity(bookId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!result || result.quantity - result.borrowed <= 0) {
      return res.status(400).json({ error: 'Le livre n\'est pas empruntable.' });
    }
    Borrowing.createBorrowing(bookId, personEmail, (err, borrowing) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(borrowing);
    });
  });
});

router.put('/emprunt/:id', (req, res) => {
  const { id } = req.params;
  Borrowing.updateBorrowing(id, (err, borrowing) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(borrowing);
  });
});

module.exports = router;
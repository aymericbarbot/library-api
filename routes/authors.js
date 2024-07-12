const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/auteur', (req, res) => {
  Author.getAllAuthors((err, authors) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(authors);
  });
});

router.get('/auteur/:id', (req, res) => {
  const { id } = req.params;
  Author.getAuthorById(id, (err, author) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!author) {
      return res.status(404).json({ error: 'Auteur non trouvé.' });
    }
    res.json(author);
  });
});

router.post('/auteur', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Le nom de l\'auteur est requis.' });
  }
  Author.createAuthor(name, (err, author) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(author);
  });
});

router.put('/auteur/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Le nom de l\'auteur est requis.' });
  }
  Author.updateAuthor(id, name, (err, author) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(author);
  });
});

router.delete('/auteur/:id', (req, res) => {
  const { id } = req.params;
  Author.deleteAuthor(id, (err, author) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(author);
  });
});

module.exports = router;
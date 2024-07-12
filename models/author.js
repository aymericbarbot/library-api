const db = require('../database');

const getAllAuthors = (callback) => {
  const sql = 'SELECT * FROM authors';
  db.all(sql, [], callback);
};

const getAuthorById = (id, callback) => {
  const sql = 'SELECT * FROM authors WHERE id = ?';
  db.get(sql, [id], callback);
};

const createAuthor = (name, callback) => {
  const sql = 'INSERT INTO authors (name) VALUES (?)';
  db.run(sql, [name], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id: this.lastID });
  });
};

const updateAuthor = (id, name, callback) => {
  const sql = 'UPDATE authors SET name = ? WHERE id = ?';
  db.run(sql, [name, id], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id });
  });
};

const deleteAuthor = (id, callback) => {
  const sql = 'DELETE FROM authors WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id });
  });
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
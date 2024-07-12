const db = require('../database');

const createBorrowing = (bookId, personEmail, callback) => {
  const dateBorrowed = new Date().toISOString().split('T')[0];
  const sqlPerson = 'INSERT INTO persons (email) VALUES (?) ON CONFLICT(email) DO UPDATE SET email = email RETURNING id';
  
  db.get(sqlPerson, [personEmail], function(err, person) {
    if (err) {
      return callback(err);
    }
    const personId = person.id;
    const sqlBorrowing = 'INSERT INTO borrowings (book_id, person_id, date_borrowed) VALUES (?, ?, ?)';
    db.run(sqlBorrowing, [bookId, personId, dateBorrowed], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null, { id: this.lastID });
    });
  });
};

const updateBorrowing = (id, callback) => {
  const dateReturned = new Date().toISOString().split('T')[0];
  const sql = 'UPDATE borrowings SET date_returned = ? WHERE id = ?';
  db.run(sql, [dateReturned, id], function(err) {
    if (err) {
      return callback(err);
    }
    callback(null, { id });
  });
};

module.exports = {
  createBorrowing,
  updateBorrowing,
};
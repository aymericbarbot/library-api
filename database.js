const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./Bibliothèque.sql', (err) => {
  if (err) {
    console.error('Erreur lors de l\'ouverture de la base de données:', err.message);
  } else {
    console.log('Connecté à la base de données SQLite.');
  }
});

module.exports = db;
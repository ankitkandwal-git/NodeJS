const sqlite3 = require('sqlite3').verbose();

// Create a new database connection

const db = new sqlite3.Database('./banking.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    } else {
    console.log('Connected to the banking database.');
    process.exit(1)
  }
});

module.exports = db;
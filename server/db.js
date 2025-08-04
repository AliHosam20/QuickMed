const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const users = [
  { username: "demo@gmail.com", password: "1234" }
];


const dbPath = path.resolve(__dirname, '../quickmed.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('❌ DB connection error:', err.message);
  else console.log('✅ Connected to SQLite database');
});

module.exports = db;

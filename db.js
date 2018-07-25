const Sqlite3 = require('sqlite3').verbose()
const db = new Sqlite3.Database('./model/address_book.db')

module.exports = db
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./address_book.db");

function createTable() {
  db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS Groups (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR (20))`);

    db.run(`CREATE TABLE IF NOT EXISTS Contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR (20),
            office VARCHAR (100),
            phone VARCHAR (100) UNIQUE,
            email TEXT UNIQUE)`);

    db.run(`CREATE TABLE IF NOT EXISTS GroupsContacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contactId INTEGER,
            groupId INTEGER ,
            FOREIGN KEY (contactId) REFERENCES Contacts(id),
            FOREIGN KEY (groupId) REFERENCES Groups(id))`);
  });
}

createTable();

module.exports = db;

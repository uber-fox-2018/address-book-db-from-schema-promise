const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./address_book.db');

//create address book table
let contactsTable    = "CREATE TABLE IF NOT EXISTS contacts (ID INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL,company VARCHAR NOT NULL, phone VARCHAR (12), email VARCHAR NOT NULL UNIQUE)";
let groupsTable      = "CREATE TABLE IF NOT EXISTS groups (ID INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL UNIQUE)";
let contactGroupTable = "CREATE TABLE IF NOT EXISTS contactGroup (ID INTEGER PRIMARY KEY AUTOINCREMENT, contactId INTEGER, groupId INTEGER, FOREIGN KEY (contactId) REFERENCES contacts (ID), FOREIGN KEY (groupId) REFERENCES groups (ID))";


db.serialize(()=>{
    db.run(contactsTable)
})

db.serialize(()=>{
    db.run(groupsTable)
})
db.serialize(()=>{
    db.run(contactGroupTable)
})
module.exports = db;
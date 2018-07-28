const db = require('./db')

var create_table_Contacts = `CREATE TABLE IF NOT EXISTS Contacts (
                                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                name VARCHAR(50),
                                company_name VARCHAR(50),
                                phone_number VARCHAR(50) UNIQUE,
                                email VARCHAR(50) UNIQUE)`

var create_table_Groups = `CREATE TABLE IF NOT EXISTS Groups (
                            Id INTEGER PRIMARY KEY AUTOINCREMENT,
                            groupName VARCHAR(50))`

var create_table_ContactsGroups   = `CREATE TABLE IF NOT EXISTS ContactsGroups (
                                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    contactId INTEGER,
                                    groupId INTEGER,
                                    FOREIGN KEY (contactId) REFERENCES Contacts(Id),
                                    FOREIGN KEY (groupId) REFERENCES Groups(Id))`

db.serialize(() => {
    db.run(create_table_Contacts, function(err) {
        if (err) throw err
        console.log(`sukses create table contacts`)
    })

    db.run(create_table_Groups, function(err) {
        if (err) throw err
        console.log(`sukses create table groups`)
    })

    db.run(create_table_ContactsGroups, function(err) {
        if (err) throw err
        console.log(`sukses create table contacts-groups`)
    })
})

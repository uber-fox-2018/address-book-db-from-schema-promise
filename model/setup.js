const db = require('./database')


class Setup {
    static createTable() {
        db.serialize(function() {
            db.run(`CREATE TABLE IF NOT EXISTS Contacts(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(255),
                company VARCHAR(255),
                phoneNumber VARCHAR(20) UNIQUE,
                email VARCHAR(100) UNIQUE
            )`, (err) => {
                (!err) ? console.log('Success To Create Table Contact') : console.log(err.message);
            })
    
            db.run(`CREATE TABLE IF NOT EXISTS Groups(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                groupName VARCHAR(255)
            )`, function(err) {
                (!err) ? console.log('Success To Create Table Groups') : console.log(err.message);
            })
    
            db.run(`CREATE TABLE IF NOT EXISTS groupContacts(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                contactId INTEGER,
                groupId INTEGER,
                FOREIGN KEY (contactId) REFERENCES Contacts(id),
                FOREIGN KEY (groupId) REFERENCES Groups(id)
            )`, function(err) {
                (!err) ? console.log('Success To Create Table groupContacts') : console.log(err.message);
            })
    
            db.run(`INSERT INTO Contacts (name, company, phoneNumber, email)
                    VALUES ("Fajar", "Toyota", "082211511212", "fajartc03@mail.com")`
            , function(err) {
                (!err) ? console.log(this) : console.log(err.message);
                /** 
                * value from this if data success :
                * Statement {
                    sql: 'INSERT INTO Contacts (name, company, phoneNumber, email)\n                VALUES ("Fajar", "Toyota", "082211511212", "fajartc03@mail.com")',
                    lastID: 2,
                    changes: 1 }
                */
            })
        })
    }
}

Setup.createTable()
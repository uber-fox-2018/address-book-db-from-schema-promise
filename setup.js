const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS Contacts
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50),
          company VARCHAR(50),
          phoneNumber VARCHAR(50) UNIQUE,
          address VARCHAR(100) )`, 
    (err)=> {if (err){
      return console.log(err.message);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS Groups
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50) )`, 
    (err)=> {if (err){
      return console.log(err.message);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS ContactGroups
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          contactId INTEGER REFERENCES Contacts(id),
          groupId INTEGER REFERENCES Groups(id) )`, 
    (err)=> {if (err){
      return console.log(err.message);
    }
  });

  db.close((err) => {
  if (err) {
    return console.log(err.message);
  }
  })

  console.log('database created successfully');

});
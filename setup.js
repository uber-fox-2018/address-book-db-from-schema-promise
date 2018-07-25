const db = require('./db')

class Setup {
  static crateTable() {
    let queryTableContact       = `CREATE TABLE IF NOT EXISTS Contacts 
                                  (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) UNIQUE,
                                  perusahaan VARCHAR(100), number_phone VARCHAR(15) UNIQUE, email VARCHAR(100) UNIQUE)`
    let queryTableGroup        = `CREATE TABLE IF NOT EXISTS Groups 
                                  (id INTEGER PRIMARY KEY AUTOINCREMENT, name_group VARCHAR(100))`
    let queryTableContactGroup = `CREATE TABLE IF NOT EXISTS ContactGroups 
                                  (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                  contact_id INTEGER, group_id INTEGER,
                                  FOREIGN KEY (contact_id) REFERENCES Contacts(id),
                                  FOREIGN KEY (group_id) REFERENCES Groups(id))`

    db.serialize(() => {
      db.run(queryTableContact, err => {
        if (err) throw err
        console.log('Create table Contact successfully')
      });

      db.run(queryTableGroup, err => {
        if (err) throw err
        console.log('Create table Group successfully')
      });

      db.run(queryTableContactGroup, err => {
        if (err) throw err
        console.log('Create table ContactGroup successfully')
      });
    })
  }
}

Setup.crateTable()
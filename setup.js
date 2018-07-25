const db = require('./db')

class Create {

    static tableContact () {
        let query = `CREATE TABLE IF NOT EXISTS Contacts (
                     contactID INTEGER PRIMARY KEY AUTOINCREMENT,
                     name VARCHAR(100),
                     telp VARCHAR(12),
                     company VARCHAR(50),
                     email VARCHAR(50),
                     UNIQUE(email));`
                     return new Promise((resolve, reject) => {
                        db.run(query, (err) => {
                            if(err) {
                                reject(err)
                            }else {
                                resolve()
                            }
                        })
                     })
                     
    }

    static tableGroup () {
        let query = `CREATE TABLE IF NOT EXISTS Groups (
                     groupID INTEGER PRIMARY KEY AUTOINCREMENT,
                     groupName VARCHAR(100));`
                     return new Promise((resolve, reject) => {
                        db.run(query, (err) => {
                            if(err) {
                                reject(err)
                            }else {
                                resolve()
                            }
                        })
                     })

    }

    static tableContactGroup () {
        let query = `CREATE TABLE IF NOT EXISTS ContactGroups (
                     contactGroupID INTEGER PRIMARY KEY AUTOINCREMENT,
                     contactID INTEGER,
                     groupID INTEGER,
                     FOREIGN KEY (contactID) REFERENCES Contacts (contactID),
                     FOREIGN KEY (groupID) REFERENCES Groups (groupID))`
                     return new Promise((resolve, reject) => {
                        db.run(query, (err) => {
                            if(err) {
                                reject(err)
                            }else {
                                resolve()
                            }
                        })
                     })
    }

}

Create.tableContact()
.then(() => {
    console.log('create table contact success');
    return Create.tableGroup()
})

.then(() => {
    console.log('create table group success');
    return Create.tableContactGroup()
})

.then(() => {
    console.log('create table contactgroup success');
})

.catch((err) => {
    console.log(err.message); 
})
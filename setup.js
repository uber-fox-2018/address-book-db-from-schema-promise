const db = require('./db')

class Setup {
    static setupTable(){
        let query_contact = `CREATE TABLE Contacts (
                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                             name VARCHAR,
                             company VARCHAR,
                             phone VARCHAR,
                             email VARCHAR UNIQUE)`

        let query_group = `CREATE TABLE Groups (
                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                           group_name VARCHAR)`

        let query_groupContacts = `CREATE TABLE groupContacs (
                                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                                   contactId INTEGER,
                                   groupId INTEGER,
                                   FOREIGN KEY (contactId) REFERENCES Contacts(id),
                                   FOREIGN KEY (groupId) REFERENCES Groups(id))`
        
        db.serialize(function(err){
            if (err) throw err
            db.run(query_contact,function(err){
                if (err) throw err
                console.log(`contact table successfully created`);
            })

            db.run(query_group,function(err){
                if (err) throw err
                console.log(`group table successfully created`);
            })

            db.run(query_groupContacts, function(err){
                if (err) throw err
                console.log(`groupContacts table successfully created`);
            })
        })
    }
}
const db = require('./config.js');

db.serialize(()=> {
    db.serialize( () => {
        let contacts = `CREATE TABLE IF NOT EXISTS contacts (
<<<<<<< HEAD
            id	        INTEGER     PRIMARY KEY AUTOINCREMENT,
            name	    VARCHAR,
            company	    VARCHAR,
            phoneNumber	VARCHAR     UNIQUE,
            email	    VARCHAR     UNIQUE
=======
            id	    INTEGER PRIMARY KEY AUTOINCREMENT,
            name	VARCHAR,
            company	VARCHAR,
            phoneNumber	VARCHAR,
            email	VARCHAR
>>>>>>> d2c991271cdd05c20e2dc870cf36e5a414936335
        );`;
        db.run(contacts);
    });
    
    db.serialize( () => {
        let groups = `CREATE TABLE IF NOT EXISTS groups (
<<<<<<< HEAD
            id	        INTEGER     PRIMARY KEY AUTOINCREMENT,
            name	    VARCHAR
=======
            id	INTEGER PRIMARY KEY AUTOINCREMENT,
            name	VARCHAR
>>>>>>> d2c991271cdd05c20e2dc870cf36e5a414936335
        );`;
        db.run(groups);
    });

    db.serialize( () => {
        let contact_group = `CREATE TABLE IF NOT EXISTS contact_group (
<<<<<<< HEAD
            id	        INTEGER     PRIMARY KEY AUTOINCREMENT,
            contactId	INTEGER,
            groupId	    INTEGER,
            FOREIGN KEY(contactId)  REFERENCES contacts(id),
            FOREIGN KEY(groupId)    REFERENCES groups(id)
=======
            id	INTEGER PRIMARY KEY AUTOINCREMENT,
            contactId	INTEGER,
            groupId	INTEGER,
            FOREIGN KEY(contactId) REFERENCES contacts(id),
            FOREIGN KEY(groupId) REFERENCES groups(id)
>>>>>>> d2c991271cdd05c20e2dc870cf36e5a414936335
        );`;
        db.run(contact_group);
    });
});

db.close();







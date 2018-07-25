var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./address_book.db");

class ContactGroup {
  constructor() {}
  assign(contactName, groupName) {
    return new Promise((resolve, reject) => {

      let queryFindContact = `SELECT id FROM Contacts WHERE name like "${contactName}"`;

      db.get(queryFindContact, function(err, contactData) {
        if (err) {
          err.message;
        } else {
          console.log(contactData);
          let queryFindGroup = `SELECT id FROM Groups WHERE name like "${groupName}"`;
          db.get(queryFindGroup, function(err, groupData) {
            console.log(groupData);
            let querryAssign = `INSERT INTO GroupsContacts ( contactId,groupId)
            VALUES("${contactData.id}","${groupData.id}"); `;
            db.run(querryAssign, function(err) {
              if (err) reject(err.message);
              let info = `data success`;
              resolve(info);
            });
          });
        }
      });

      
    });
  }
}

module.exports = ContactGroup;

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./address_book.db");

class Group {
  constructor(name) {
    this.id = null;
    this.name = name;
    this.peoples = [];
  }

  save() {
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO Groups (name) VALUES ("${this.name}")`;

      let that = this;
      db.run(query, function(err) {
        if (err) {
          reject(err.message);
        } else {
          that.id = this.lastID;
          let info = `Added ${that.name} to Groups with id: ${that.id}`;
          resolve(info);
        }
      });
    });
  }

  update(id, value) {
    return new Promise((resolve, reject) => {
      let query = `UPDATE Groups
    SET name = "${value}"
    WHERE id = "${id}"`;

      db.run(query, function(err) {
        if (err) {
          reject(err.message);
        } else {
          let info = `edited to ${value} to row name in Table Group`;
          resolve(info);
        }
      });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM Groups
    WHERE id = "${id}"`;

      db.run(query, function(err) {
        if (err) {
          reject(err.message);
        } else {
          let info = `deleted id ${id} from table Groups`;
          resolve(info);
        }
      });
    });
  }

  show(id) {
    return new Promise((resolve, reject) => {
      let query = `SELECT Contacts.name FROM Contacts  left JOIN Groups ON GroupsContacts.contactId=Contacts.id left Join GroupsContacts ON GroupsContacts.groupId=Groups.id where Groups.id = "${id}"`;
      db.all(query, function(err, data) {
        if (err) {
          reject(err.message, );
        } else {
          if (data.length) {
            resolve(data);
          } else {
            resolve(`Member not exist`);
          }
        }
      });
    });
  }
}

module.exports = Group;

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./address_book.db");

class Contact {
  constructor(name, office, phone, email) {
    this.id = null;
    this.name = name;
    this.office = office;
    this.phone = phone;
    this.email = email;
  }

  save() {
    return new Promise((resolve, reject) => {
      let query = `INSERT INTO Contacts (name,office,phone,email)
VALUES("${this.name}", "${this.office}", "${this.phone}", "${this.email}");`;
      let that = this;
      db.run(query, function(err) {
        if (err) {
          reject(err);
        } else {
          that.id = this.lastID;
          let info = `Added ${that.name} to contacts`;
          resolve(info);
        }
      });
    });
  }

  update(id, value) {
    return new Promise((resolve, reject) => {
      let query = `UPDATE Contacts
    SET name = "${value}"
    WHERE id = "${id}"`;

      db.run(query, function(err) {
        if (err) {
          reject(err.message);
        } else {
          let info = `edited to ${value} to row name`;
          resolve(info);
        }
      });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      let query = `DELETE FROM Contacts
    WHERE id = "${id}"`;
      db.run(query, function(err) {
        if (err) {
          reject(err.message);
        } else {
          let info = `deleted id ${id} from table Contacts`;
          resolve(info);
        }
      });
    });
  }

  show(id) {
    return new Promise((resolve, reject) => {
      let query = `SELECT Groups.name FROM Contacts  left JOIN GroupsContacts ON GroupsContacts.contactId = Contacts.id  left JOIN Groups ON GroupsContacts.groupId=Groups.id where Contacts.id = "${id}" `;
      db.all(query, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  findContact(columnRow, constraint) {
    let operator;

    return new Promise((resolve, reject) => {
      let column = [];
      let data = [];
      for (let i = 0; i < columnRow.length; i += 2) {
        column.push(columnRow[i]);
        data.push(columnRow[i + 1]);
        console.log(`col=> ` + column);
        console.log(`row=> ` + data);

        switch (constraint) {
          case "like":
            operator = "like";
            break;

          case "not like":
            operator = "not like";
            break;

          case "=":
            operator = "=";
            break;

          case "in":
            operator = "in";
            break;

          case "%":
            operator = `${data}%`;
            break;

          case "%%":
            operator = `%${data}%`;
            break;
        }
        let query = `SELECT * FROM Contacts WHERE ${column} ${operator} "${data}" `;
        db.each(query, function(err, element) {
          if (err) {
            reject(err.message);
          } else {
            resolve(element);
          }
        });
      }
    });
  }
}

module.exports = Contact;

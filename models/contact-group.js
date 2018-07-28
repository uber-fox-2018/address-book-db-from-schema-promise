const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./address_book.db')

class ContactGroup {
    static assign(contactId, groupId, callback) {
        let query_assign = `INSERT INTO ContactsGroups (contactId, groupId) VALUES ("${contactId}", "${groupId}")`
        return new Promise ((resolve, reject) => {
            db.run(query_assign, function(err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    static show() {
        let query_show = `SELECT name, company_name, phone_number, email, groupName FROM Contacts
                            INNER JOIN ContactsGroups ON Contacts.Id = ContactsGroups.contactId
                            INNER JOIN Groups ON Groups.Id = ContactsGroups.groupId`
        return new Promise ((resolve, reject) => {
            db.all(query_show, function(err,data) {
                if (err) {
                   reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

module.exports = ContactGroup
const fs = require('fs');
const db = require('./db.js');

class Contact {
    constructor(name, company_name, phone_number, email) {
        this.id = null;
        this.name = name;
        this.company_name = company_name;
        this.phone_number = phone_number;
        this.email = email;
    }

    static transferContacts() {
        return new Promise ((resolve, reject) => {
            let contacts = JSON.parse(fs.readFileSync('datacontacts.json', 'utf8'));
            for (let i = 0 ; i < contacts.length; i++) {
                const queryTransfer = `INSERT INTO Contacts (name, company_name, phone_number, email)
                                       VALUES ("${contacts[i].name}", "${contacts[i].company_name}", "${contacts[i].phone_number}", "${contacts[i].email}")`;
                db.serialize(function () {
                    db.run(queryTransfer, function (err) {
                        if (!err) {
                            resolve(`Data transferred successfully!`);
                        } else {
                            reject(err);
                        }
                    })
                })
            }
        })
    }

    static createContact(name, company_name, phone_number, email) {
        return new Promise((resolve, reject) => {
            const queryAdd = `INSERT INTO Contacts (name, company_name, phone_number, email)
                              VALUES ("${name}", "${company_name}", "${phone_number}", "${email}")`;
            db.run(queryAdd, function (err, data) {
                if (!err) {
                    resolve(`New contact has been added with ID ${this.lastID} - ${name}`);
                } else {
                    reject(err);
                }
            })
        })
    }

    static updateContact(id, column, value_edited) {
        return new Promise((resolve, reject) => {
            const queryUpdate = `UPDATE Contacts SET "${column}" = "${value_edited}"
                                 WHERE id = ${id}`;
            db.run(queryUpdate, function (err, dataupdate) {
                if (!err) {
                    resolve(`Data contact has been updated`);
                } else {
                    reject(err);
                }
            })
        })
    }

    static deleteContact(id) {
        return new Promise((resolve, reject) => {
            const queryDelete = `DELETE FROM Contacts WHERE id = ${id}`;
            db.run(queryDelete, function (err, datadelete) {
                if (!err) {
                    resolve(`Contact ID ${id} has been deleted`);
                } else {
                    reject(err);
                }
                const queryUpdate = `UPDATE ContactGroups SET contactId = NULL
                                     WHERE contactId = ${id}`;
                db.run(queryUpdate, function (err, data) {
                    if (!err) {
                        resolve(this.changes)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    }

    static showContact(id) {
        return new Promise((resolve, reject) => {
            const queryShow = `SELECT Contacts.name, Contacts.company_name, Contacts.phone_number, Contacts.email, Groups.name AS GroupName
                               FROM Contacts
                               LEFT JOIN ContactGroups
                                    ON Contacts.id = ContactGroups.contactId
                               LEFT JOIN Groups
                                    ON ContactGroups.groupId = Groups.id
                               WHERE Contacts.id = ${id}`;
            db.all(queryShow, function (err, dataContact) {
                if(!err) {
                    resolve(dataContact);
                } else {
                    reject(err);
                }
            })
        })
    }

    static assignContact(contactName, groupName) {
        return new Promise((resolve, reject) => {
            const queryGetContactId = `SELECT id AS ContactId FROM Contacts
                                       WHERE name  = "${contactName}"`;

            const queryGetGroupId = `SELECT id AS GroupId FROM Groups
                                     WHERE name = "${groupName}"`;

            db.get(queryGetContactId, function (err, dataContact) {
                if (!err) {
                    resolve(dataContact);
                } else {
                    reject(err);
                }
                db.get(queryGetGroupId, function (err, dataGroup) {
                    if (!err) {
                        resolve(dataGroup);
                    } else {
                        reject(err);
                    }
                    const queryJoin = `INSERT INTO ContactGroups (contactId, groupId)
                                       VALUES ("${dataContact.ContactId}", "${dataGroup.GroupId}")`;
                    db.run(queryJoin, function (err, data) {
                        if (!err) {
                            resolve(data)
                        } else {
                            reject(err)
                        }
                    })
                })
            })
        })
    }
}

module.exports = Contact;
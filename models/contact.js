const fs = require('fs')
const db = require('../db')

class Contact {

    static create (name, telp, company, email) {
        return new Promise((resolve, reject) => {
        let query = `INSERT INTO Contacts 
                     (name, telp, company, email)
                     VALUES ("${name}", "${telp}", "${company}", "${email}");`
                    db.run(query, (err) => {
                        if(!err) {
                            resolve()
                        }else {
                            reject(err)
                        }
                    })
        })
    }

    static update (id, name, telp, company, email) {
        return new Promise((resolve, reject) => {
        let query = `UPDATE Contacts
                     SET name = "${name}", telp = "${telp}", company = "${company}", email = "${email}"
                     WHERE contactID = "${id}"`
                    db.run(query, (err) => {
                        if(!err) {
                            resolve()
                        }else {
                            reject(err)
                        }
                    })
        })
    }

    static delete (id) {
        return new Promise((resolve, reject) => {
        let query = `DELETE FROM Contacts
                     WHERE contactID = ${id}`
                    db.run(query, (err) => {
                        if(!err) {
                            resolve()
                        }else {
                            reject(err)
                        }
                    })
        })
    }

    static show () {
        return new Promise((resolve, reject) => {
        let query = `SELECT * FROM Contacts`
                    db.all(query, (err, data) => {
                        if(!err) {
                            resolve(data)
                        }else {
                            reject(err)
                        }
                    })
        })
    }

    static seed () {
        let dataContacts = JSON.parse(fs.readFileSync('./data/contacts.json', 'utf8'))
        
        return new Promise((resolve, reject) => {
            for(let i=0; i<dataContacts.length; i++){
                let query = `INSERT INTO Contacts
                             (name, telp, company, email)
                             VALUES ("${dataContacts[i].name}", "${dataContacts[i].telp}", "${dataContacts[i].company}", "${dataContacts[i].email}")`
                            db.run(query, (err) => {
                                if(!err) {
                                    resolve()
                                }else {
                                    reject(err)
                                }
                            })
                            
            }
        })

    }
}

module.exports = Contact;
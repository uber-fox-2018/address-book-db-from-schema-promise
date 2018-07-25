const fs = require('fs')
const db = require('../db')

class ContactGroup {
    static seed () {
        let dataContactGroup = JSON.parse(fs.readFileSync('./data/contactGroups.json', 'utf8'))
        
        return new Promise((resolve, reject) => {
            for(let i=0; i<dataContactGroup.length; i++){
                let query = `INSERT INTO ContactGroups
                             (contactId, groupId)
                             VALUES ("${dataContactGroup[i].contactID}", "${dataContactGroup[i].groupID}")`
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

    static show (groupName) {
        return new Promise((resolve, reject) => {
        let query = `SELECT name, telp FROM ContactGroups
                     INNER JOIN Groups
                        ON Groups.groupID = ContactGroups.groupID
                     INNER JOIN Contacts
                        ON Contacts.contactID = ContactGroups.contactID
                     WHERE Groups.groupName = "${groupName}"`
                     db.all(query, (err, data) => {
                        if(!err) {
                            resolve(data)
                        }else {
                            reject(err)
                        }
                     })
        })
    }

    static assign (contactID, groupID, ) {
        return new Promise((resolve, reject) => {
        let query = `INSERT INTO ContactGroups (contactID, groupID)
                     VALUES (${contactID}, ${groupID})`
                     db.run(query, (err) => {
                        if(!err) {
                            resolve()
                        }else {
                            reject(err)
                        }
                     })
        })
    }
}

module.exports = ContactGroup;
const db = require('../db')
const modelContact = require('./model_contact')
const modelGroup = require('./model_group')

class ContactGroup {

  static insert(contact_id, group_id) {
    return new Promise((resolve, reject) => {
      let qInsertContactGrou = `INSERT INTO ContactGroups (contact_id, group_id)
                                        VALUES ("${contact_id}", "${group_id}")`
              
      db.run(qInsertContactGrou, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static showContact() {
    return new Promise((resolve, reject) => {
      let queryShowContact = `SELECT contact_name, perusahaan, email, Groups.name_group FROM ContactGroups, (
                                SELECT 
                                  Contacts.name AS contact_name, 
                                  Contacts.perusahaan AS perusahaan,
                                  Contacts.email As email,
                                  Contacts.number_phone AS phone,
                                  ContactGroups.contact_id
                                FROM Contacts
                                JOIN ContactGroups
                                ON Contacts.id = ContactGroups.contact_id
                                GROUP BY contact_id
                              ) AS newContactGroup
                              JOIN Groups
                              ON ContactGroups.group_id = Groups.id
                              WHERE ContactGroups.contact_id = newContactGroup.contact_id`

      db.all(queryShowContact, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  static showGroup() {
    return new Promise((resolve, reject) => {
      let queryShowGroup = `SELECT name_group, name FROM Groups JOIN ContactGroups
                          ON Groups.id = ContactGroups.group_id
                          JOIN Contacts
                          ON ContactGroups.contact_id = Contacts.id`
                          

      db.all(queryShowGroup, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  static assignContact(data) {
    return new Promise((resolve, reject) => {
      let name = data[0]
      let group = data[1]
      let contact = ''
      modelContact.find([`name:${name}`, 'op:like'])
        .then(dataContact => {
          contact = dataContact
          return modelGroup.find([`name_group:${group}`, 'op:like'])
        })
        .then(dataGroup => {
          let contact_id = contact[0].id
          let group_id = dataGroup[0].id
          return ContactGroup.insert(contact_id, group_id)
        })
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

module.exports = ContactGroup
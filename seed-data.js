const fs = require('fs')
const db = require('./db')

class SeedData {
  static insertDataContact() {
    let dataContact = fs.readFileSync('data_contact.csv', 'utf-8').split('\n')

    for (let i = 1; i < dataContact.length; i++) {
      let splitData = dataContact[i].split(',')
      let name = splitData[0]
      let perusahaan = splitData[1]
      let number_phone = splitData[2]
      let email = splitData[3]

      let queryInsert = `INSERT INTO Contacts (name, perusahaan, number_phone, email)
                         VALUES ("${name}", "${perusahaan}", "${number_phone}", "${email}")`
      db.run(queryInsert, err => {
        if (err) throw err
        console.log('Data Contact successfully add to database')
      })
    }
  }

  static insertDataGroup() {
    let dataGroup = fs.readFileSync('data_group.csv', 'utf-8').split('\n')

    for (let i = 1; i < dataGroup.length; i++) {
      let queryInsert = `INSERT INTO Groups (name_group)
                         VALUES ("${dataGroup[i]}")`
      db.run(queryInsert, err => {
        if (err) throw err
        console.log('Data Group successfully add to database')
      })
    }
  }

  static insertDataContactGroup() {
    let dataContactGroup = fs.readFileSync('data_group_contact.csv', 'utf-8').split('\n')

    for (let i = 1; i < dataContactGroup.length; i++) {
      let dataSplit = dataContactGroup[i].split(',')
      let contact_id = dataSplit[0]
      let group_id = dataSplit[1]

      let queryInsert = `INSERT INTO ContactGroups (contact_id, group_id)
                         VALUES ("${contact_id}", "${group_id}")`
      db.run(queryInsert, err => {
        if (err) throw err
        console.log('Data ContactGroup successfully add to database')
      })
    }
  }
}

SeedData.insertDataContact()
SeedData.insertDataGroup()
SeedData.insertDataContactGroup()

module.exports = SeedData
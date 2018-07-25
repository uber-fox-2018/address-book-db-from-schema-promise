const Contact = require('./contact')
const db = require('../db')

class ContactModel {
  static save(data) {
    return new Promise((resolve, reject) => {
      let contact = new Contact(data[0], data[1], data[2], data[3])
      let queryInsert = `INSERT INTO Contacts (name, perusahaan, number_phone, email)
                        VALUES ("${contact.name}", "${contact.perusahaan}", "${contact.number_phone}", "${contact.email}")`

      db.run(queryInsert, (err) => {
        if (err) {
          reject(err)
        } else {
          let queryTotalContact = `SELECT COUNT(*) AS totalContact FROM Contacts`
          db.all(queryTotalContact, (err, data) => {
            if (err) throw err
            let totalContact = data[0].totalContact
            let message = {"name": contact.name, "totalContact": totalContact}
            resolve(message)
          })
        }
      })
    })
  }

  static update(data) {
    return new Promise((resolve, reject) => {
      let dataSplit = data[1].split(':')
      let id = Number(data[0])
      let column = dataSplit[0]
      let value = dataSplit[1]
      
      let queryUpdate = `UPDATE Contacts SET ${column} = "${value}" WHERE id = ${id}`

      db.run(queryUpdate, (err) => {
        if (err) {
          let messageErr = {msgErr: `${column}`}
          reject(messageErr)
        } else {
          let data = {"id": id}
          resolve(data)
        }
      })
    })
  }

  static remove(data) {
    return new Promise((resolve, reject) => {
      let dataSplit = data[0].split(':')
      let name = dataSplit[1]
      let queryDelete = `DELETE FROM Contacts WHERE name LIKE "%${name}%"`
      ContactModel.find([`name:${name}`, 'op:like'])
        .then(data => {
          if (data.length === 1) {
            db.run(queryDelete, (err) => {
              if (err) {
                reject(err)
              } else {
                let data = {"name": name}
                resolve(data)
              }
            })
          } else {
            let messageErr = {messageErr: 'The Contact has been deleted'}
            reject(messageErr)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static find(data) {
    return new Promise((resolve, reject) => {
      let op = data[data.length-1].split(':')[1]
      for (let i = 0; i < data.length-1; i++) {
        let split = data[i].split(':')
        let column = split[0]
        let value = split[1]
        let operator = ''
        switch(op) {
          case 'like': {
            operator = `LIKE "%${value}%"`
            break
          }
          case 'equal': {
            operator = `= "${value}"`
            break
          }
          case 'not like': {
            operator = `NOT LIKE "%${value}%"`
            break
          }
        }

        let query = `SELECT * FROM Contacts WHERE ${column} ${operator}`
        
        db.all(query, (err, data) => {
          if (err) {
            reject(err)
          } else {
            if (data.length === 0) {
              let message = {messageInfo: `Data tidak ditemukan`}
              reject(message)
            } else {
              resolve(data)
            }
          }
        })
        
      }
    })
  }
}

module.exports = ContactModel
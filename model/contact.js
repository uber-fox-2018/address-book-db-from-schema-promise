const db = require('./database')

class ModelContact {

  static writeData(query) {
    return new Promise ((resolve, reject) => {
      db.run(query, function(err) {
        if (err) {
          reject(err)
        } else {
          resolve(this)
        }
      })
    })
  }

  static findData(query) {
    return new Promise ((resolve, reject) => {
      db.get(query, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  static readDataAll(query) {
    return new Promise((resolve, reject) => {
      db.all(query, function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  static insertContact(name, company, phoneNumber, email) {
    return new Promise((resolve, reject) => {
      let queryInsert = `
            INSERT INTO Contacts (name, company, phoneNumber, email)
            VALUES("${name}", "${company}", "${phoneNumber}", "${email}");
            `
      this.writeData(queryInsert)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  static showContacts() {
    return new Promise ((resolve, reject) => {
      let readQuery = `SELECT * FROM Contacts`
      this.readDataAll(readQuery)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  static editContact(name, company, phoneNumber, email, id, callback) {
    return new Promise((resolve, reject) => {
      let editQuery = `
          UPDATE Contacts 
          SET name = "${name}", 
          phoneNumber = "${phoneNumber}", 
          company = "${company}",
          email = "${email}"
          WHERE id = ${id}`
        this.writeData(editQuery)
        .then(data => {
          resolve(`Contact with id: ${id} has been chanced!`)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static removeContact(name, callback) {
    return new Promise ((resolve, reject) => {
      let selectQuery = `SELECT * FROM Contacts WHERE name = "${name}"`
      this.findData(selectQuery)
      .then(data => {
        let deleteConjuntionQuery = `DELETE FROM groupContacts WHERE id = ${data.id}`
        return this.writeData(deleteConjuntionQuery)
      })
      .then(data => {
        let deleteQuery = `
                DELETE FROM Contacts
                WHERE name = "${name}"`
        return this.writeData(deleteQuery)
      })
      .then(data => {
        resolve(`Contact ${name} has been deleted!`)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  static find(nameColumn, value, operand, operand2) {
    return new Promise ((resolve, reject) => {
      let query = `SELECT * FROM Contacts
                      WHERE `
      switch (operand) {
        case '=':
          query += `${nameColumn[0]} = "${value[0]}" `
          break;
        case '>':
          query += `${nameColumn[0]} > "${value[0]}" `
          break;
        case '<':
          query += `${nameColumn[0]} < "${value[0]}" `
          break;
        case 'like':
          query += `${nameColumn[0]} like "%${value[0]}%" `
        default:
      }
  
      switch (operand2) {
        case 'OR':
          if (operand === 'like') {
            query += `OR ${nameColumn[1]} ${operand} "%${value[1]}%"`
          } else {
            query += `OR ${nameColumn[1]} ${operand} "${value[1]}"`
          }
          break;
        case 'AND':
          if (operand === 'like') {
            query += `AND ${nameColumn[1]} ${operand} %${value[1]}%`
          } else {
            query += `AND ${nameColumn[1]} ${operand} ${value[1]}`
          }
          break;
        default:
          query += ''
      }
      this.readDataAll(query)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

module.exports = ModelContact
const db = require('./database')


class ModelGroup {
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
    
      static insertGroup(name) {
        return new Promise((resolve, reject) => {
            let queryInsert = `
                INSERT INTO Groups (groupName)
                VALUES("${name}");
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
    
      static showGroups() {
        return new Promise ((resolve, reject) => {
          let readQuery = `SELECT * FROM Groups`
          this.readDataAll(readQuery)
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
        })
      }
    
      static editGroup(name, id) {
        return new Promise((resolve, reject) => {
            let editQuery = `
                UPDATE Groups 
                SET groupName = "${name}"
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
    
      static removeGroup(name) {
        return new Promise ((resolve, reject) => {
          let selectQuery = `SELECT * FROM Groups WHERE groupName = "${name}"`
          this.findData(selectQuery)
          .then(data => {
            let deleteConjuntionQuery = `DELETE FROM groupContacts WHERE id = ${data.id}`
            return this.writeData(deleteConjuntionQuery)
          })
          .then(data => {
            let deleteQuery = `
                    DELETE FROM Groups
                    WHERE groupName = "${name}"`
            return this.writeData(deleteQuery)
          })
          .then(data => {
            resolve(`Group ${name} has been deleted!`)
          })
          .catch(err => {
            reject(err)
          })
        })
      }
}

module.exports = ModelGroup
    // static insertGroup(name, callback) {
    //     let queryInsert = `
    //     INSERT INTO Groups (groupName)
    //     VALUES("${name}");
    //     `
    //     db.run(queryInsert, function(err) {
    //         (err) ? callback(err, null) : callback(null, this)
    //     })
    // }
    
    // static showGroups(callback) {
    //     let readQuery = `
    //     SELECT * FROM Groups`
    //     db.all(readQuery, function(err, data) {
    //         (err) ? callback(err, null) : callback(null, data)
    //     })
    // }
    
    // static editGroup(name, id, callback) {
    //     let editQuery = `
    //     UPDATE Groups 
    //     SET groupName = "${name}"
    //     WHERE id = ${id}`
    //     db.run(editQuery, function(err) {
    //         (err) ? callback(err, null) : callback(null, `Group has been chanced!`)
    //     })
    // }
    
    // static removeGroup(name, callback) {
    //     let selectQuery = `SELECT * FROM Groups WHERE groupName = "${name}"`
    //     db.get(selectQuery, function(err, row) {
    //         if(err) {
    //             callback(err, null)
    //         } else {
    //             let deleteConjuntionQuery = `DELETE FROM groupContacts WHERE groupId = ${row.id}`
    //             db.run(deleteConjuntionQuery)
    //             let deleteQuery = `
    //             DELETE FROM Groups
    //             WHERE groupName = "${row.groupName}"`
    //             db.run(deleteQuery, function(err) {
    //                 if(err) {
    //                     callback(err)
    //                 } else {
    //                     callback(null, `Group ${name} has been deleted!`)
    //                 } 
    //             })
    //         }
    //     })
    // }
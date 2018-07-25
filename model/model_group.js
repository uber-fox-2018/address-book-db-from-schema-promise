const Group = require('./group')
const db = require('../db')

class GroupModel {
  static save(data) {
    return new Promise((resolve, reject) => {
      let group = new Group(data[0])
      let queryInsert = `INSERT INTO Groups (name_group)
                        VALUES ("${group.name_group}")`
      
      db.run(queryInsert, (err) => {
        if (err) {
          reject(err)
        } else {
          let message = {name_group: `${group.name_group}`}
          resolve(message)
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

      let queryUpdate = `UPDATE Groups SET ${column} = "${value}" WHERE id = ${id}`

      db.run(queryUpdate, (err) => {
        if (err) {
          reject(err)
        } else {
          let data = {"id": id}
          resolve(data)
        }
      })
    })
  }

  static remove(data) {
    return new Promise((resolve, reject) => {
      let id = Number(data[0].split(':')[1])
      let qDeleteGroup = `DELETE FROM Groups WHERE id = ${id}`
      let qDeleteContactGroup = `DELETE FROM ContactGroups WHERE group_id = ${id}`

      db.run(qDeleteGroup, (err) => {
        if (err) {
          reject(err)
        }
      })
      db.run(qDeleteContactGroup, (err) => {
        if (err) {
          reject(err)
        } 
        let message = {"id": id}
        resolve(message)
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

        let query = `SELECT * FROM Groups WHERE ${column} ${operator}`
        
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

module.exports = GroupModel
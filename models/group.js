const fs = require('fs')
const db = require('../db')

class Group {
    static create (groupName) {
        return new Promise((resolve, reject) => {
        let query = `INSERT INTO Groups 
                     (groupName)
                     VALUES ("${groupName}");`
                    db.run(query, (err) => {
                        if(!err) {
                            resolve()
                        }else {
                            reject(err)
                        }
                    })
        })
    }

    static update (id, groupName) {
        return new Promise((resolve, reject) => {
        let query = `UPDATE Groups
                     SET groupName = "${groupName}"
                     WHERE groupID = "${id}"`
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
        let query = `DELETE FROM Groups
                     WHERE groupID = ${id}`
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
        let query = `SELECT * FROM Groups`
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
        let dataGroups = JSON.parse(fs.readFileSync('./data/groups.json', 'utf8'))
        
        return new Promise((resolve, reject) => {
            for(let i=0; i<dataGroups.length; i++){
                let query = `INSERT INTO Groups
                             (groupName)
                             VALUES ("${dataGroups[i].groupName}")`
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

module.exports = Group;
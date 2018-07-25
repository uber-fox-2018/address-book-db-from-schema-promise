const db = require('../db/db')

class Model {

    static add(name) {
        return new Promise((resolve,reject)=>{
            let query = `insert into Groups (groupname)
            values("${name}")`
            db.serialize(function () {
                db.run(query, function (err) {
                    if (err) {
                        let msg = {error:`insert group failed`}
                        reject(msg.error)
                    }
                    resolve(name, null)
                })
            })
        })
    }

    static read() {
        return new Promise((resolve,reject)=>{
            let query = `select * from Groups`
            db.serialize(function () {
                db.all(query, function (err, data) {
                    if (err) {
                        let msg = {error:`read group failed`}
                        reject(msg.error)
                    }
                    resolve(data)
                })
            })
        })

    }

    static update(id, column, value) {
        return new Promise((resolve,reject)=>{
            let query = `update Groups
            set "${column}" = "${value}"
            where id = "${id}"`
            db.serialize(function () {
                db.run(query, function (err) {
                    if (err) {
                        let msg = {error:`update group failed`}
                        reject(msg.error)
                    }
                    resolve(value, null)
                })
            })
        })
    }

    static delete(id, cb) {
        return new Promise((resolve,reject)=>{
            let query = `delete from Groups where id = "${id}"`
            db.serialize(function () {
                db.run(query, function (err) {
                    if (err) {
                        let msg = {error:`delete group failed`}
                        reject(msg.error)
                    }
                    resolve(id, null)
                })
            })
        })
    }

}

module.exports = Model
const db = require('../db/db')

class Model{

    static add(name, company, phone, email) {
        return new Promise((resolve, reject) => {
            let query = `insert into Contacts(name,company,phone_number,email)
            values("${name}","${company}","${phone}","${email}")`
            db.serialize(function () {
                db.run(query, function (err) {
                    if (err) {
                        let msg = {error:`insert contact failed`}
                        reject(msg.error)
                    }
                    resolve(name)
                })
            })
        })
    }

    static read() {
        return new Promise((resolve,reject)=>{
            let query = `select * from Contacts`
            db.serialize(function(){
                db.all(query, function (err, data) {
                    if (err) {
                        let msg = {error:`read contact failed`}
                        reject(msg.err)
                    }
                    resolve(data)
                })
            })

        })

    }

    static update(id,column,value,cb) {
        return new Promise((resolve,reject)=>{
            let query = `update Contacts
            set "${column}" = "${value}"
            where id = "${id}"`
            db.serialize(function(){
                db.run(query,function(err){
                    if(err){
                        let msg = {error:`update contact failed`}
                        reject(msg.err)
                    }
                    resolve(value)
                })
            })
        })
    }

    static delete(id,cb) {
        return new Promise((resolve,reject)=>{
            let query = `delete from Contacts where id = "${id}"`
            db.serialize(function(){
                db.run(query, function (err) {
                    if (err) {
                        let msg = {error:`delete contact failed`}
                        reject(msg.err)
                    }
                    resolve(id)
                })
            })
        })
    }


}

module.exports = Model
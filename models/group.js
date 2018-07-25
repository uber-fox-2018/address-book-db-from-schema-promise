const db = require('../db')
const fs = require('fs')

class Group {
    static readFile(){
        let data = fs.readFileSync('../data_json/groups.json')
        let convertedData = JSON.parse(data)

        return convertedData
    }

    static seedData(){
        let data = this.readFile()
        for (let i = 0; i < 10; i++) {
            db.serialize(function(){
                db.run(`INSERT INTO Groups (group_name) 
                        VALUES ("${data[i].group_name}")`,function(err){
                            if (err) throw err
                            console.log(`sukses`);  
                        })
            })
        }
    }

    static add(group_name){
        let query = `INSERT INTO Groups (group_name)
                     VALUES ("${group_name}")`

        return new Promise ((resolve,reject) => {
            db.run(query,function(err){
                if (err) {
                    reject(err)
                }else{
                    let msg = {msg: `Added new Group`}
                    resolve(msg)
                }
            })
        })
    }

    static remove(id){
        let query = `DELETE FROM Groups WHERE id = "${id}"`

        return new Promise((resolve,reject) => {
            db.run(query,function(err){
                if (err) {
                    reject(err)
                }else {
                    db.run(`DELETE FROM groupContacs WHERE groupId = "${id}"`,function(err){
                        if (err) {
                            reject(err)
                        }else {
                            let msg = {msg: `Group with id ${id} successfully deleted`}
                            resolve(msg)
                        }
                    })
                }
            })
        })
    }

    static update(id,input){
        let query = `UPDATE Group SET group_name = "${input}" WHERE id = "${id}"`

        return new Promise ((resolve,reject) => {
            db.run(query, function(err) {
                if (err) {
                    reject(err)
                }else {
                    let msg = {msg: `group name with id ${id} has been updated with ${input}`}
                    resolve(msg)
                }
            })
        })
    }

    static findById(id){
        let query = `SELECT * FROM Groups WHERE id = "${id}"`

        return new Promise ((resolve,reject) => {
            db.get(query,function(err,data) {
                if (err) {
                    reject(err)
                }else [
                    resolve(data)
                ]
            })
        })
    }

    static showAll(){
        let query = `select Groups.id,group_name,name from Groups left join groupContacs ON
                     Groups.id = groupContacs.groupId left join Contacts ON
                     groupContacs.contactId = Contacts.id`

        return new Promise ((resolve,reject) => {
            db.all(query,function(err,data) {
                if (err) {
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }
}


module.exports = Group

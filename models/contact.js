const db = require('../db')
const fs = require('fs')

class Contact {
    static readFile(){
        let data = fs.readFileSync('../data_json/contacts.json')
        let convertedData = JSON.parse(data)

        return convertedData
    }

    static seedData(){
        let data = this.readFile()
        for (let i = 0; i < 20; i++) {
            db.serialize(function(){
                db.run(`INSERT INTO Contacts (name,company,phone,email) 
                        VALUES ("${data[i].name}", "${data[i].company}","${data[i].phone}","${data[i].email}")`,function(err){
                            if (err) throw err
                            console.log(`sukses`);  
                        })
            })
        }
    }

    static add(name,company,phone,email){
        let query = `INSERT INTO Contacts (name,company,phone,email)
                     VALUES ("${name}","${company}","${phone}","${email}")`

        return new Promise ((resolve,reject) => {
            db.run(query,function(err){
                if (err) {
                    reject(err)
                }else{
                    let msg = {msg: `Added new contact`}
                    resolve(msg)
                }
            })
        })
    }

    static remove(id){
        let query = `DELETE FROM Contacts WHERE id = "${id}"`

        return new Promise ((resolve,reject) => {
            db.run(query,function(err){
                if (err) {
                    reject(err)
                }else {
                    db.run(`DELETE FROM groupContacs WHERE contactId = "${id}"`,function(err){
                        if (err) {
                            reject(err)
                        }else{
                            let msg = {msg: `contact with id ${id} successfully deleted`}
                            resolve(msg)
                        }
                    })
                }
            })
        })
    
    }

    static update(id,column,input){
        let query = `UPDATE Contacts SET ${column} = "${input}" WHERE id = "${id}"`

        return new Promise ((resolve,reject) => {
            db.run(query, function(err) {
                if (err) {
                    reject(err)
                }else {
                    let msg = {msg: `${column} contact with id ${id} has been updated with ${input}`}
                    resolve(msg)
                }
            })
        })
    }

    static findById(id){
        let query = `SELECT * FROM Contacts WHERE id = "${id}"`

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
        let query = `select Contacts.id,name,company,phone,email,group_name from Contacts left join groupContacs ON
                     Contacts.id = groupContacs.contactId left join Groups ON
                     groupContacs.groupId = Groups.id`

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

module.exports = Contact
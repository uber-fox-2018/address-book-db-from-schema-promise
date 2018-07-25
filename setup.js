const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('database.db')
const fs = require('fs')

class Model{
    static update(data){
        return new Promise((resolve,reject) =>{
            let query = `UPDATE ${data[0]}s SET "${data[2]}" = "${data.slice(4).join(' ')}" WHERE id = "${data[1]}"`
            db.run(query,(err) =>{
                resolve(data)
            })
        })
    }
    static delete(data ,namaTable,cb){
        return new Promise((resolve,reject) =>{
            let query = `DELETE FROM ${data[0]}s WHERE id = "${data[1]}"`;
        
            db.run(query,(err) =>{
                let query = `UPDATE contact_groups SET ${namaTable} = null WHERE ${namaTable} = "${data[1]}"`
                db.run(query,(err) =>{
                    resolve(data)
                })
            }) 
        })
    }
    static show(param){
        return new Promise((resolve, reject)=>{
            let query = `SELECT * FROM ${param}`
            db.all(query,(err,data) =>{
                resolve(data)
            })
            
        })
    }
}


class InsertGroups{
    static contact(){
        let data = fs.readFileSync('./contact.json').toString()
        data = JSON.parse(data)

        for(let i = 0 ; i < data.length ; i++){
            let query = `INSERT INTO contacts(name,company,phone_number,email) VALUES("${data[i].first_name}","${data[i].company}" ,"${data[i].phone_number}","${data[i].email}")`
            db.run(query,(err) =>{
                console.log(`Success input data`);
            })            
            
        }        
    }
    static group(){
        let data = fs.readFileSync('./group.json').toString()
        data = JSON.parse(data)
        
        for(let i = 0 ; i < data.length ; i++){
            let query = `INSERT INTO groups(name) VALUES("${data[i].name}")`
            db.run(query,(err) =>{
                console.log(`Success input data`);
            })
        }
    }
    static contactGroups(){
        let data = fs.readFileSync('./contact_groups.json').toString()
        data = JSON.parse(data)
        for(let i = 0 ; i < data.length ; i++){
            let query = `INSERT INTO contact_groups(contact_id,group_id) VALUES ("${data[i].contact_id}","${data[i].group_id}")`
            db.run(query,(err) =>{
                console.log('Success input data');
            })
        }
    }
}

class CreateTable{
    static contactTable(){
        let query = `CREATE TABLE IF NOT EXISTS "contacts" (
            "id"	        INTEGER PRIMARY KEY AUTOINCREMENT,
            "name"          TEXT,
            "company"	    TEXT,
            "phone_Number"	TEXT,
            "email"	        TEXT)`;
        db.run(query,(err) =>{})
    }
    static contactGroupTable(){
        let query = `CREATE TABLE IF NOT EXISTS "contact_groups" (
            "id"	        INTEGER PRIMARY KEY AUTOINCREMENT,
            "contact_id"    INTEGER,
            "group_id"      INTEGER
        )`;
        db.run(query,(err) =>{})
    }
    static groupTable(){
        let query = `CREATE TABLE IF NOT EXISTS "groups" (
            "id"    INTEGER PRIMARY KEY AUTOINCREMENT,
            "name"  TEXT
        )`;
        db.run(query,(err) =>{})
    }
}

module.exports = Model

var sqlite = require('sqlite3').verbose()
var db = new sqlite.Database('database.db')

class Group{
    static createGroup(name){
        return new Promise((resolve,reject)=>{
            let query = `INSERT INTO groups(name) values ('${name}')`;
            db.run(query,(err) =>{
                resolve(['groups',name])
            }) 
        })      
    }
}

module.exports = Group

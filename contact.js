var sqlite = require('sqlite3').verbose()
var db = new sqlite.Database('database.db')

class Contact{
    static createcontact(data){
        return new Promise((resolve,reject) =>{
            let query = `INSERT INTO contacts(name,company,phone_number,email) VALUES ("${data[0]}","${data[1]}","${data[2]}","${data[3]}")`
            db.run(query,(err) =>{
                resolve([`contact`,data[0]])
            })
        })
        
    }
    
    // static delete(data ,namaTable,cb){
    //     let query = `DELETE FROM ${data[0]}s WHERE id = "${data[1]}"`;
        
    //     db.run(query,(err) =>{
    //         let query = `UPDATE contact_groups SET ${namaTable} = null WHERE ${namaTable} = "${data[1]}"`
    //         db.run(query,(err) =>{
    //             cb(data)
    //         })
    //     })
                
    // }
}

module.exports = Contact
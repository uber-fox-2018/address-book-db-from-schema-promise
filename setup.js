const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./db/addressBookdb')

function create_and_seed() {
    var queryKontak = `CREATE TABLE IF NOT EXISTS kontak
                        (id INTEGER PRIMARY KEY AUTOINCREMENT,
                         nama VARCHAR(15),
                         nama_perusahaan VARCHAR(20),
                         nomor_telp VARCHAR(15) UNIQUE,
                         email VARCHAR(20) UNIQUE);`
    var queryGrup = `CREATE TABLE IF NOT EXISTS grup
                     (id INTEGER PRIMARY KEY AUTOINCREMENT,
                      nama VARCHAR(20));`
    
    var queryKontakGrup = `CREATE TABLE IF NOT EXISTS kontak_grup
                           (id INTEGER PRIMARY KEY AUTOINCREMENT,
                            kontak_id INTEGER,
                            grup_id INTEGER,
                            FOREIGN KEY (kontak_id) REFERENCES kontak(id),
                            FOREIGN KEY (grup_id) REFERENCES grup(id));`
    
    db.serialize(function(){
        db.run(queryKontak,(err)=>{
            if(err)console.error(err.message)
        })

        db.run(queryGrup,(err)=>{
            if(err) console.error(err.message)
        })

        db.run(queryKontakGrup,(err)=>{
            if(err) console.error(err.message)
        })
    })
}


create_and_seed()
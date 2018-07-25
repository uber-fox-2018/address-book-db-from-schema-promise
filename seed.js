const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./db/addressBookdb')
var fs = require('fs')

var kontak = fs.readFileSync('./kontak.csv','utf8').split('\n')
db.serialize(function(){
    for(var i = 1; i < kontak.length;i++){
        var kontakParse = kontak[i].split(',')
        var query = `INSERT INTO kontak VALUES (null, "${kontakParse[0]}","${kontakParse[1]}","${kontakParse[2]}","${kontakParse[3]}");`
        db.run(query,(err)=>{
            if(err){
                console.error(err.message)
            }
        })
    }
})

var grup = fs.readFileSync('./grup.csv','utf8').split('\n')
db.serialize(function(){
    for(var i = 1; i < grup.length;i++){
        var grupParse = grup[i].split(',')
        var query = `INSERT INTO grup VALUES (null, "${grupParse[0]}");`
    db.run(query,(err)=>{
        if(err){
            console.error(err.message)
        }
    })
        
}
})





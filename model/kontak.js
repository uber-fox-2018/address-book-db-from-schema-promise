const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./db/addressBookdb')

class Kontak{
    static insert(nama, nama_perusahaan, nomor_telp, email){
        return new Promise (function(resolve,reject){
            var query = `INSERT INTO kontak VALUES (null,"${nama}","${nama_perusahaan}","${nomor_telp}","${email}");`
            db.run(query,function(err){
                if(err){
                    var err = {message : 'insert data failed'}
                    reject(err)
                }else{
                    resolve(this.lastID)
                }
            })
        })
        
    }

    

    static update(id, nama, nama_perusahaan, nomor_telp, email){
        return new Promise (function(res,rej){
            var query = `UPDATE kontak
                     SET nama = "${nama}", nama_perusahaan = "${nama_perusahaan}", nomor_telp = "${nomor_telp}", email = "${email}"
                     WHERE id = ${id}`

        db.run(query,function(err){
            if(err){
                var err = {message : 'update data failed'}
                rej(err)
            }else{
                res(this)
            }
        })
        })
        
    }

    static cekData(column,value){
        return new Promise(function(res,rej){
            var query = `SELECT * FROM kontak where ${column} = "${value}"`
            db.all(query,(err,data)=>{
                if(err){
                    var err = `data not found`
                    rej(err)
                }else{
                    res(data)
                }
            })
        })

    }


    static delete(column, value){
        let that = this
        let query = `DELETE FROM kontak WHERE ${column} = "${value}"`
       return new Promise (function(res,rej){
            that.cekData(column,value)
            .then(responseCek =>{
                if(responseCek.length === 0 || responseCek === undefined){
                    var err = {message : `data not found`}
                    rej(err)
                }else{
                    db.run(query,(err)=>{
                        if(!err){
                            var succes = {message :`data has been deleted`}
                            res(succes)
                        }else{
                            rej(err)
                        }
                    })
                }
            })
            .catch(err =>{
                rej(err)
            })
       })
        
        
    }

    static findKontak(column, value){
        return new Promise (function(res,rej){
            var query = `SELECT * FROM kontak WHERE ${column} = "${value}"`
            db.all(query,(err,data)=>{
                if(err){
                    var err = {message : `data not found`}
                    rej(err)
                }else if(data === undefined || data.length === 0){
                    var err = {message : `data not found`}
                    rej(err)
                }else{
                    res(data)
                }
            })
        })
        
    }

    static showKontak(){
        return new Promise(function(res,rej){
            var query = `SELECT * FROM kontak JOIN kontak_grup ON kontak.id = kontak_grup.kontak_id JOIN grup ON kontak_grup.grup_id = grup.id`
            db.all(query,(err,data)=>{
                if(err){
                    var err = {message : `data not found`}
                    rej(err)
                }else if(data === undefined || data.length === 0){
                    var err = {message : `data not found`}
                    rej(err)
                }else{
                    res(data)
                }
            })
        })
        
    }

    static request(column1, column2, value1, value2, operan, conjunction,cb){
        return new Promise(function(res,rej){
            if(operan === 'like'){
                var query = `SELECT * FROM kontak WHERE ${column1} ${operan} "%${value1}%" ${conjunction} ${column2} ${operan} "%${value2}%"`
            }else if(operan === '='){
                var query = `SELECT * FROM kontak WHERE ${column1} ${operan} "${value1}" ${conjunction} ${column2} ${operan} "${value2}"`
            }
    
            db.all(query,(err,data)=>{
                if(err){
                    var err = {message : `data not found`}
                    rej(err)
                }else if(data === undefined || data.length === []){
                    var err = {message : `data not found`}
                    rej(err)
                }else{
                    res(data)
                }
            })
        })
    }

}

module.exports = Kontak
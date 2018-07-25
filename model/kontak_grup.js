const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./db/addressBookdb')


class KontakGrup{

    static cekGrup(id){
        return new Promise(function(res,rej){
            var qGrupId = `SELECT * FROM grup where id = "${id}"`
            
            db.get(qGrupId, (err,data)=>{
                if(err){
                    var err = {message : `id grup not found`}
                    rej(err)
                }else{
                    res(data)
                }
            })
        })
    }
    
    static cekKontak(id){
        return new Promise(function(res,rej){
            var qKontakId = `SELECT * FROM kontak WHERE id = "${id}"`

            db.get(qKontakId,(err,data)=>{
                if(err){
                    var err = {message : `id kontak not found`}
                    rej(err)
                }else{
                    res(data)
                }
            })
            
        })
    }

    static cekKontakGrup(id){
        return new Promise(function(res,rej){
            var query = `SELECT * FROM kontak_grup WHERE id = "${id}"`
            db.get(query,(err,data)=>{
                if(err){
                    var err = {message : `id not found`}
                    rej(err)
                }else{
                    res(data)
                }
            })
            
        })
    }
    
    static insert(kontak_id,grup_id,cb){
        let that = this
        var query = `INSERT INTO kontak_grup VALUES (null,"${kontak_id}","${grup_id}");`
        var errGrup = {message : `id grup not found`}
        var errKontak = {message : `id kontak not found`}
        var errInsert = {message : `insert failed`}
        return new Promise(function(res,rej){
            that.cekGrup(grup_id)
            .then(result =>{
                if(result === undefined || result.length === 0){
                    rej(errGrup)
                }else{
                    return that.cekKontak(kontak_id)
                }
            })

            .then(result =>{
                if(result === undefined || result.length === 0){
                    rej(errKontak)
                }else{
                    db.run(query,(err)=>{
                        if(err){
                            rej(errInsert)
                        }else{
                            res()
                        }
                    })
                }
            })

            .catch(err =>{
                rej(err)
            })
        })
    }

    static update(id,kontak_id,grup_id,cb){
        let that = this
        var errGrup = {message : `id grup not found`}
        var errKontak = {message : `id kontak not found`}
        var errUpdate = {message : `update failed`}
        var query = `UPDATE kontak_grup
                     SET kontak_id = ${kontak_id}, grup_id = ${grup_id}
                     WHERE id = ${id}`
        return new Promise(function(res,rej){
            that.cekKontak(kontak_id)
            .then(result=>{
                if(result === undefined){
                    rej(errKontak)
                }else{
                    return that.cekGrup(grup_id)
                }
            })

            .then(result =>{
                if(result === undefined){
                    rej(errGrup)
                }else{
                    db.run(query,(err)=>{
                        if(err){
                            rej(errUpdate)
                        }else{
                            res()
                        }
                    })
                }
            })

            .catch(err=>{
                rej(err)
            })
        })
    }


    static delete(id){
        let that = this
        var query = `DELETE FROM kontak_grup WHERE id = ${id}`
        return new Promise(function(res,rej){
            that.cekKontakGrup(id)
            .then(result=>{
                if(result === undefined){
                    var err = {message : `id not found`}
                    rej(err)
                }else{
                    db.run(query,(err)=>{
                        if(err){
                            var err = {message : `id not found`}
                            rej(err)
                        }else{
                            res()
                        }
                    })
                }
            })

            .catch(err=>{
                rej(err)
            })
        })

    }
}

module.exports = KontakGrup


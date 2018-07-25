const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./db/addressBookdb')


class Grup{
    static insert(namaGrup){
        return new Promise (function(res,rej){
            var query = `INSERT INTO grup VALUES (null, "${namaGrup}")`
            db.run(query, (err)=>{
                if(err){
                    var err = {message : `insert data failed`}
                    rej(err)
                }else{
                    res()
                }
            })
        })
    }

    static cekData(column,value){
        return new Promise(function(res,rej){
            var query = `SELECT * FROM grup WHERE ${column} = "${value}"`
            db.all(query,(err,data)=>{
                if(err){
                    var err = {message : 'data not found'}
                    rej(err)
                }else{
                    // console.log(data);
                    res(data)
                }
            })
        })
    }
    
    static deleteConjunction(){
        return new Promise (function(res,rej){
           
    
            db.run(qIdConjunction,(err)=>{
                if(err){
                    var err = {message : `data in conjunction not deleted`}
                    rej(err)
                }else{
                    res()
                }
            })
        })
    }

    static update(id,namaGrup){
        let that = this
        var qUpdate = `UPDATE grup
                        SET nama = "${namaGrup}"
                        WHERE id = ${id}`
        return new Promise(function(res,rej){
                        
            that.cekData("id",id)
            .then(result =>{
                if(result.length === 0){
                    var err = {message : 'data not found'}
                    rej(err)
                }else{
                    db.run(qUpdate,(err)=>{
                        if(err){
                            var err = {message : 'update failed'}
                            rej(err)
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
    
    static delete(column,value){
        let that = this
        var query = `DELETE FROM grup WHERE ${column} = ${value}`
        var qIdConjunction = `DELETE FROM kontak_grup
                                WHERE grup_id = ${value}`
        var err = {message : 'data not found'}
        return new Promise(function(res, rej){
            that.cekData(column, value)
            .then(result => {
                if(result.length === 0){
                    rej(err)
                }else{
                    
                    db.run(query,(err)=>{
                        if(!err){
                           res() 
                        }else{
                            rej(err)
                        }
                    })

                    db.run(qIdConjunction)
                }
            })

            .catch(err => {
                rej(err)
            })
        })
    }

    static findGrup(column,value){

        return new Promise(function(res,rej){
            var query = `SELECT * FROM grup WHERE ${column} = "${value}"`
            db.get(query,(err,data)=>{
                if(err){
                    var err = {message : 'data not found'}
                   rej(err)
                }else if (data === undefined){
                    var err = {message : 'data not found'}
                    rej(err)
                }else{
                    res(data)
                }
            })
        })
    }
}

module.exports = Grup
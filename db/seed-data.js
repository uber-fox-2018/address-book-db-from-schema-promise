const fs = require('fs')
const db = require('./db')

class Seed{

    static contact(){
        return new Promise((resolve,reject)=>{
            let data = fs.readFileSync('./db/dataDummy.json','utf8')
            let dataParse = JSON.parse(data)
            dataParse.forEach(element => {
                let query = `insert into Contacts(name,company,phone_number,email)
                values("${element.name}","${element.company}","${element.phone_number}","${element.email}")`
                db.serialize(function(){
                    db.run(query,function(err){
                        if(err)throw err
                        let message = {err: `Data contact error while seeding`}
                        resolve('Data contact has been seded succesfully')
                        reject(message.err)
                    })
                }) 
            });
        })
    }

    static group(){
        let data = fs.readFileSync('./db/dataDummy.csv','utf8')
        let dataGroup = data.split('\n')
        for(let i = 1; i< dataGroup.length-1; i++){
            let query = `insert into Groups(name) values("${dataGroup[i]}");`
            db.serialize(function(){
                db.run(query,function(err){
                    if(err) throw err
                })
            })
        }
    }

}

module.exports = Seed

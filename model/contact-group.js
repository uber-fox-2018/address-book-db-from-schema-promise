const db = require('../db/db')

class Model{

    static assignContact(contactId,groupId){
        return new Promise((resolve,reject)=>{
            let query = `insert into ContactGroups(contactId,groupId) values("${contactId}","${groupId}")`
            db.serialize(function(){
                db.run(query,function(err){
                    if (err) {
                        let msg = {error:`assign contact failed`}
                        reject(msg.error)
                    }
                    let message = {success:`Contact with ${contactId} has been assign to group with id ${groupId}`}
                    resolve(message.success,null)
                })
            })
        })
    }



}

module.exports = Model
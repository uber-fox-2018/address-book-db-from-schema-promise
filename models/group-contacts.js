const db = require('../db')

class GroupContact {
    static showAll(){
        let query = `SELECT Groups.id,group_name,name,company,phone,email FROM Groups INNER JOIN groupContacs ON
                     Groups.id = groupContacs.groupId INNER JOIN Contacts ON
                     groupContacs.contactId = Contacts.id
                     ORDER BY Groups.id`

        return new Promise ((resolve,reject) => {
            db.all(query,function(err,data) {
                if (err) {
                    reject(err)
                }else {
                    resolve(data)
                }
            })
        })
    }

    static assign(contactId,groupId){
        let query = `INSERT INTO groupContacs (contactId,groupId) VALUES ("${contactId}","${groupId}")`

        return new Promise ((resolve,reject) => {
            db.run(query,function(err){
                if (err) {
                    reject(err)
                }else {
                    let msg = {msg: `successfully added to group with id ${groupId}`}
                    resolve(msg)
                }
            })
        })
    }
}

module.exports = GroupContact
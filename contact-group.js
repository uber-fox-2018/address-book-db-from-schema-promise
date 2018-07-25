const db = require("./setup.js")

class ContactGroup{
    static findLastId(){
        let getLastID = `SELECT max(ID) as lastID FROM contactGroup`;
            return new Promise((resolve, reject) => {
                db.get(getLastID, (err, data) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(data.lastID);
                    }
                })
            })
    }

    static save(jsonFile){
        let addContactGroups = `INSERT INTO contactGroup(contactId, groupId) VALUES (?,?)`;
        let length = `SELECT COUNT (*) as data FROM contactGroup`
        return new Promise((resolve, reject) => {
            db.serialize(()=>{
                jsonFile.forEach(cgroup=>{
                    db.run(addContactGroups,[cgroup.contactId, cgroup.groupId], function(err){
                        if(err) reject(err);
                        if(!err){
                            db.get(length, (err, result)=>{
                                if(!err) resolve(result.data);
                            })
                        }
                    })
                }) 
            })        
        })   
    }

    static create(obj){
        let addContactGroups = `INSERT INTO contactGroup(contactId, groupId) VALUES (?,?)`;
        let length = `SELECT COUNT (*) as data FROM contactGroup`
        return new Promise((resolve, reject) => {
            db.serialize(()=>{
                db.run(addContactGroups, [obj.contactId, obj.groupId], function(err){
                    if(err) reject(err);
                    if(!err){
                        db.get(length, (err, result)=>{
                            if(!err) resolve(result.data);
                        })
                    }
                })  
            })
        })
    }

    static update(newValues, whereCondition){
        return new Promise((resolve, reject)=>{
            for(let key in newValues){
                let query = `UPDATE contactGroup SET ${key} = "${newValues[key]}" WHERE ID =  ${whereCondition.id}`;
                db.serialize(()=>{
                    db.run(query, function(err){
                        if(err) reject(err);
                        if(!err) resolve(this.changes);
                    })
                })
            }
        })
        
    }

    static delete(obj){
        let query;
        return new Promise ((resolve, reject)=>{
            for(let key in obj){
                if(key!=="id"){
                    query = `DELETE FROM contactGroup WHERE ${key} = "${obj[key]}"`;
                }else{
                    query = `DELETE FROM contactGroup WHERE ID = ${obj[key]}`;
                }
                db.serialize(()=>{
                    db.run(query, function(err){
                        if(err) reject(err)
                        if(!err) resolve(this.changes)
                    })
                }) 
            }
        })  
    }

}


module.exports = ContactGroup;
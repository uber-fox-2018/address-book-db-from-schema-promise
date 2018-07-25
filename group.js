const db = require("./setup.js")

class Group{
    static findLastId(){
        let getLastID = `SELECT max(ID) as lastID FROM groups`;
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
        let addGroups = `INSERT INTO groups(name) VALUES (?)`;
        let length = `SELECT COUNT (*) as data FROM groups`
        return new Promise((resolve, reject) => {
            db.serialize(()=>{
                jsonFile.forEach(group=>{
                    db.run(addGroups,[group.name], function(err){
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
        let addGroups = `INSERT INTO groups(name) VALUES (?)`;
        let length = `SELECT COUNT (*) as data FROM groups`;
        return new Promise((resolve, reject) => {
            db.serialize(()=>{
                db.run(addGroups, [obj.name], function(err){
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
                let query = `UPDATE groups SET ${key} = "${newValues[key]}" WHERE ID =  ${whereCondition.id}`;
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
        let query2;
        return new Promise ((resolve, reject)=>{
            for(let key in obj){
                if(key!=="id"){
                    query = `DELETE FROM groups WHERE ${key} = "${obj[key]}"`;
                }else{
                    query = `DELETE FROM groups WHERE ID = ${obj[key]}`;
                    query2 = `DELETE FROM contactGroup WHERE groupId = ${obj[key]}`;
                }
                db.serialize(()=>{
                    db.run(query, function(err){
                        if(err) reject(err)
                        if(!err) resolve(this.changes)
                    })

                    db.run(query2, (err)=>{
                        if(err) throw err
                    })
                }) 
            }
        }) 
    }

    static show(){
        let query = `SELECT name, (SELECT name FROM contacts WHERE ID = contactId) AS contactName FROM groups
                     JOIN contactGroup
                     ON groups.ID = contactGroup.groupId
                     ORDER BY name`;
        return new Promise((resolve, reject)=>{
            db.serialize(()=>{
                db.all(query, (err, data)=>{
                    if(err) reject(err)
                    if(!err) resolve(data)
                })
            })
        })
    }  
}


module.exports = Group;
const db = require("./setup.js")

class Contact{
    static findLastId(){
        let getLastID = `SELECT max(ID) as lastID FROM contacts`;
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
        let addContacts = `INSERT INTO contacts(name, company, phone, email) VALUES (?, ?, ?, ?)`;
        let length = `SELECT COUNT (*) as data FROM contacts`
        return new Promise((resolve, reject) => {
            db.serialize(()=>{
                jsonFile.forEach(contact=>{
                    db.run(addContacts,[contact.name, contact.company, contact.phone, contact.email], function(err){
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
        let addContact = `INSERT INTO contacts(name, company, phone, email) VALUES (?, ?, ?, ?)`;
        let length = `SELECT COUNT (*) as data FROM contacts`
        return new Promise((resolve, reject) => {
            db.serialize(()=>{
                db.run(addContact, [obj.name, obj.company, obj.phone, obj.email], function(err){
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
                let query = `UPDATE contacts SET ${key} = "${newValues[key]}" WHERE ID =  ${whereCondition.id}`;
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
                    query = `DELETE FROM contacts WHERE ${key} = "${obj[key]}"`;
                }else{
                    query = `DELETE FROM contacts WHERE ID = ${obj[key]}`;
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

    static show(){
        let query = `SELECT name, company, phone, email, (SELECT name FROM groups WHERE ID = groupId) AS groupName FROM contacts
                     JOIN contactGroup
                     ON contacts.ID = contactGroup.contactId
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

module.exports = Contact;

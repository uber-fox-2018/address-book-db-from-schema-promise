const db = require('./config.js');

class Contact {
    
    constructor(id, name, company, phone, email) {
        this.table = 'contacts';
        this.id = id;
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;
    }

    // add contact in promise
    addContact(name, company, phone, email) {
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;
        
        return new Promise((resolve, reject)=> {
            let query = `INSERT INTO ${this.table}(name, company, phoneNumber, email)
                    VALUES("${this.name}", "${this.company}", "${this.phone}", "${this.email}")`;
            db.run(query, function(err) {
                if(!err) {
                    let id = this.lastID;
                    resolve(id)
                } else {
                    reject(err)
                }              
            })
        })
    }

    // contact list in promise
    contactList() {
        let query = `SELECT * FROM ${this.table}`;
        return new Promise((resolve, reject)=> {
            db.all(query, (err, data) => {
                if(!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
        
    }

    //update in promise
    updateContact(id, name, company, phone, email) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;

        let query = `UPDATE ${ this.table } SET 
            name = "${ this.name }", company = "${ this.company }", 
            phoneNumber = "${ this.phone }", email = "${ this.email }"  WHERE id = "${ this.id }"`;
        return new Promise((resolve, reject)=> {
            db.run(query, function(err) { 
                if(!err) {
                    resolve(this)
                } else {
                    reject(err)
                }
            })
        })
		
    }

    // delete contact promise
    deleteContact(id) {
        this.id = id;
        let query = `DELETE FROM ${ this.table }  WHERE id = "${ this.id }"`;
        return new Promise((resolve, reject)=> {
            db.run(query, (err) => { 
                resolve(this.id);
                reject(err);                
            })
        })
		
    }

    // find contact in promise
    findContact(id) {
        this.id = id;
        let query = `SELECT * FROM ${this.table} WHERE id = ${this.id}`;
        return new Promise((resolve, reject)=> {
            db.get(query, (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
        
    }

}

module.exports = Contact
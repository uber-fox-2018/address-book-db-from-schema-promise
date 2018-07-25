const db = require('./config.js');

class ContactGroup {

    constructor(id, contactId, groupId) {
        this.table = 'contact_group';
        this.id = id;
        this.contactId = contactId;
        this.groupId = groupId;
    }

    addContactGroup(contactId, groupId) {
        this.contactId = contactId;
        this.groupId = groupId;

        let query = `INSERT INTO ${this.table}(contactId, groupId)
                    VALUES("${this.contactId}", "${this.groupId}")`;
        db.run(query)
    }

    contactGroupList(cb) {
        let query = `SELECT * FROM ${this.table}`;
        db.all(query, (err, data) => {
            cb(data)
        })
    }

    updateContactGroup(id, contactId, groupId) {
        this.id = id;
        this.contactId = contactId;
        this.groupId = groupId;

        let query = `UPDATE ${ this.table } SET contactId = "${ this.contactId }", groupId = "${ this.groupId }"  WHERE id = "${ this.id }"`;
        db.run(query, (err) => { })
    }

    deleteContactGroup(id) {
        this.id = id;
        let query = `DELETE FROM ${ this.table }  WHERE id = "${ this.id }"`;
		db.run(query, (err) => { })
    }

}

module.exports = ContactGroup
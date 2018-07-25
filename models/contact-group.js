const fs = require('fs');
const db = require('./db.js');

class ContactGroup {
    constructor(contactId, groupId) {
        this.id = null;
        this.contactId = contactId;
        this.groupId = groupId;
    }

    static transferContactGroups() {
        return new Promise ((resolve, reject) => {
            let contactgroups = JSON.parse(fs.readFileSync('datacontact-group.json', 'utf8'));
            for (let i = 0 ; i < contactgroups.length; i++) {
                const queryTransfer = `INSERT INTO ContactGroups (contactId, groupId)
                                       VALUES ("${contactgroups[i].contactId}", "${contactgroups[i].groupId}")`;
                db.serialize(function () {
                    db.run(queryTransfer, function (err) {
                        if (!err) {
                            resolve(`Data transferred successfully!`);
                        } else {
                            reject(err);
                        }
                    })
                })
            }
        })
    }
}

module.exports = ContactGroup;
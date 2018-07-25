const fs = require('fs');
const db = require('./db.js');

class Group {
    constructor(name) {
        this.id = null;
        this.name = name;
    }

    static transferGroups() {
        return new Promise((resolve, reject) => {
            let groups = JSON.parse(fs.readFileSync('datagroups.json', 'utf8'));
            for (let i = 0; i < groups.length; i++) {
                const queryTransfer = `INSERT INTO Groups (name)
                                       VALUES ("${groups[i].name}")`;
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

    static createGroup(name) {
        return new Promise((resolve, reject) => {
            const queryAdd = `INSERT INTO Groups (name)
                              VALUES ("${name}")`;
            db.run(queryAdd, function (err, data) {
                if (!err) {
                    resolve(`New group has been added with ID ${this.lastID} - ${name}`);
                } else {
                    reject(err)
                }
            })
        })
    }

    static updateGroup(id, name) {
        return new Promise((resolve, reject) => {
            const queryUpdate = `UPDATE Groups SET name = "${name}"
                                 WHERE id = ${id}`;
            db.run(queryUpdate, function (err, dataupdate) {
                if (!err) {
                    resolve(`Group name has been updated to ${name}`);
                } else {
                    reject(err);
                }
            })
        })
    }

    static deleteGroup(id) {
        return new Promise((resolve, reject) => {
            const queryDelete = `DELETE FROM Groups WHERE id = ${id}`;
            db.run(queryDelete, function (err, datadelete) {
                if (!err) {
                    resolve(`Group ID ${id} has been deleted`);
                } else {
                    reject(err);
                }
                const queryUpdate = `UPDATE ContactGroups SET groupId = NULL
                                     WHERE groupId = ${id}`;
                db.run(queryUpdate, function (err, data) {
                    if (!err) {
                        resolve(this.changes)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    }

    static showGroup(name) {
        return new Promise((resolve, reject) => {
            const queryShow = `SELECT Groups.name, contactId 
                               FROM Groups
                               JOIN ContactGroups ON Groups.id = ContactGroups.groupId
                               WHERE Groups.name = "${name}"`;
            db.all(queryShow, function (err, dataGroup) {
                if (!err) {
                    resolve(dataGroup);
                } else {
                    reject(err);
                }
            })
        })
    }
}

module.exports = Group;
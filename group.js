const db = require('./config.js');

class Group {

    constructor(id, name) {
        this.table = 'groups';
        this.id = id;
        this.name = name
    }

    addGroup(name) {
        this.name = name;
        let query = `INSERT INTO ${this.table}(name)
                    VALUES("${this.name}")`;
        db.run(query)
    }

    groupList(cb) {
        let query = `SELECT * FROM ${this.table}`;
        db.all(query, (err, data) => {
            cb(data)
        })
    }

    updateGroup(id, name) {
        this.id = id;
        this.name = name;
    
        let query = `UPDATE ${ this.table } SET name = "${ this.name }" WHERE id = "${ this.id }"`;
        db.run(query, (err) => { })

    }

    deleteGroup(id) {
        this.id = id;
        let query = `DELETE FROM ${ this.table }  WHERE id = "${ this.id }"`;
		db.run(query, (err) => { })
    }

}

module.exports = Group
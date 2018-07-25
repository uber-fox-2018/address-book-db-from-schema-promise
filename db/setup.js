const db = require('./db')
class CreateTable{

    static contact(){
        let  query = `create table Contacts(
            id integer not null primary key autoincrement,
            name varchar(30),
            company varchar(30),
            phone_number integer,
            email text unique)`

        db.serialize(function(){
            db.run(query,function(err){
                if(err)throw err
            })
        })
    }

    static group(){
        let query = `create table Groups(
            id integer not null primary key autoincrement,
            name varchar(30)
        )`

        db.serialize(function(){
            db.run(query,function(err){
                if (err)throw err
            })
        })
    }

    static contactGroup(){
        let query = `create table ContactGroups(
            id integer not null primary key autoincrement,
            contactId integer,
            groupId integer,
            foreign key(contactId) references Contacts(id),
            foreign key(groupId) references Groups(id)
        )`

        db.serialize(function(){
            db.run(query,function(err){
                if(err)throw err
            })
        })
    }
}

module.exports = CreateTable
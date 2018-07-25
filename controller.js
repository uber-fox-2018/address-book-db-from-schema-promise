const View = require('./view.js');
const Group = require('./group.js');
const Contact = require('./contact.js')
const Model = require('./setup.js')
class Controller{
    static help(){
        let command = ['help','create group <name>','create contact <name> <company> <phone_number> <email>','update contact <id> <column> replaceBy <replace> \nExample : update contact 8 name replaceBy kosasih','update group <id> name replaceBy <replace> \nExample : update group 8 name replaceBy kosasih','delete <contact or group> <id>','showContacts','showGroups']
        for(let i = 0 ; i < command.length ; i++){
            View.command(command[i])
        }
    }
    static create(data){
        if(data[0] === 'group' && data.length === 2){
            Group.createGroup(data[1])
                .then(file =>{
                    View.added(file[0],file[1])
                })
        }else if(data[0] === 'contact' && data.length === 5){
            data = data.slice(1)
            Contact.createcontact(data, Controller)
                .then(file =>{
                    View.added(file[0],file[1])
                })
        }else{
            this.help()
        }
    }
    static update(data){
        if(data[0] === 'contact' && data.length === 5){
            Model.update(data, Controller)
                .then(file =>{
                    View.update(data)
                })
        }else if(data[0] === 'group' && data.length === 6){
            Model.update(data, Controller)   
                .then(file =>{
                    View.update(data)
                })         
        }else{
            this.help()
        }
    }
    static delete(data){
        if(data[0] === 'contact' && data.length === 2){
            Model.delete(data,'contact_id' ,Controller)
                .then(data =>{
                    View.delete(data)
                })
        }else if(data[0] === 'group' && data.length === 2){
            Model.delete(data,'group_id' ,Controller)
                .then(data =>{
                    View.delete(data)
                })
        }
    }
    static show(param){
        Model.show(param)
            .then(data =>{
                View.show(data)
            })

        
    }
}

module.exports = Controller

// 'update <name contact or group> <name column> <replace by> <name>'
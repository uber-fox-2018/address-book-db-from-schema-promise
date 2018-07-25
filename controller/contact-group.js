const Model = require('../model/contact-group')
const View = require('../view/contact-group')

class Controller{

    static assign(contactID,groupID){
        Model.assignContact(contactID,groupID,function(msg){
            View.assign(msg)
        })
    }

}

module.exports = Controller
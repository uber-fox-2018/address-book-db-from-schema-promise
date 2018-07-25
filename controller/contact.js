const Model = require('../model/contact')
const View = require('../view/contact')

class Controller {

    static add(name,company,phone,email){
        Model.add(name,company,phone,email)
        .then(function(msg){
            View.showMessageAdd(msg)
        })
        .catch(function(msg){
            View.errorMessage(msg)
        })  
    }

    static update(id,column,value){
        Model.update(id,column,value)
        .then(function(){
            View.showMessageUpdate()
        })
        .catch(function(msg){
            View.errorMessage(msg)
        })
    }

    static delete(id){
        Model.delete(id)
        .then(function(id){
            View.delete(id)
        })
        .catch(function(msg){
            View.errorMessage(msg)
        })
    }

    static showContact(){
        Model.read()
        .then(function(data){
            View.showContact(data)
        })

    }

    
}

module.exports = Controller
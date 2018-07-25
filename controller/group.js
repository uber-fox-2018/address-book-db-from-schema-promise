const Model = require('../model/group')
const View = require('../view/group')

class Controller {
    static add(name){
        Model.add(name)
        .then(function(name){
            View.showMessage(name)
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

    static showGroup(){
        Model.read()
        .then(function(data){
            View.showGroup(data)
        })
    }

    
}

module.exports = Controller
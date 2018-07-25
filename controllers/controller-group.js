const Group = require('../models/group')
const View = require('../views/group-view')

class ControllerGroup {
    static add(group_name){
        Group.add(group_name)
        .then((success) => {
            View.showSuccess(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static remove(id){
        Group.remove(id)
        .then((success) => {
            View.showSuccess(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static edit(id,input){
        Group.update(id,input)
        .then((success) => {
            View.showSuccess(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static showAll(){
        Group.showAll()
        .then((success) => {
            View.showData(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static findById(id){
        Group.findById(id)
        .then((success) => {
            View.showData(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }
}

module.exports = ControllerGroup
const Contact = require('../models/contact')
const View = require('../views/contact-view')

class ControllerContact {
    static add(name,company,phone,email){
        Contact.add(name,company,phone,email)
        .then((success) => {
            View.showSuccess(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static remove(id){
        Contact.remove(id)
        .then((success) => {
            View.showSuccess(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static edit(id,column,input){
        Contact.update(id,column,input)
        .then((success) => {
            View.showSuccess(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static showAll(){
        Contact.showAll()
        .then((success) => {
            View.showData(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static findById(id){
        Contact.findById(id)
        .then((success) => {
            View.showData(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }
}

module.exports = ControllerContact
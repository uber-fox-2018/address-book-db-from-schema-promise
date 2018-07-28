const Contact = require('../models/contact')
const View_Contact = require('../views/view-contact')

class Controller_Contact {
    static addContact (name, company_name, phone_number, email) {
        Contact.addContact(name, company_name, phone_number, email) 
        .then(data => {
            View_Contact.displayMessage(data)
        })
        .catch(err => {
            View_Contact.displayError(err)
        })
    }    

    static editContact(contactId, column, newValue) {
        Contact.editContact(contactId,column,newValue) 
        .then(data => {
            View_Contact.displayMessage(data)
        })
        .catch(err => {
            View_Contact.displayError(err)
        })
    }
    
    static deleteContact(id) {
        Contact.deleteContact(id) 
        .then(data => {
            View_Contact.displayMessage(data)
        })
        .catch(err => {
            View_Contact.displayError(err)
        })
    }    
    
}

module.exports = Controller_Contact
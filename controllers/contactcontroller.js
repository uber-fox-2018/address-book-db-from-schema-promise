const Contact = require('../models/contact.js');
const View = require('../views/view.js');

class ContactController {

    static transferContacts() {
        Contact.transferContacts()
        .then(contactsData => {
            View.displayMessage(contactsData);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

    static createContact(name, company_name, phone_number, email) {
        Contact.createContact(name, company_name, phone_number, email)
        .then(contact => {
            View.displayMessage(contact);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

    static updateContact(id, column, value_edited) {
        Contact.updateContact(id, column, value_edited)
        .then(updatedContact => {
            View.displayMessage(updatedContact);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

    static deleteContact(id) {
        Contact.deleteContact(id)
        .then(deletedContact => {
            View.displayMessage(deletedContact);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

    static showContact(id) {
        Contact.showContact(id)
        .then(contact => {
            View.displayMessage(contact);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

    static assignContact(contactName, groupName) {
        Contact.assignContact(contactName, groupName)
        .then(groupedData => {
            View.displayMessage(groupedData);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

}

module.exports = ContactController;
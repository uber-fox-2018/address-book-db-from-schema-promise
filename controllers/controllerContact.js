const Contact = require('../models/contact')
const View = require('../view')

class ControllerContact {

    static createContact (name, telp, company, email) {
        Contact.create(name, telp, company, email)
        .then(() => {
            View.showResult(`Create contact data ${name} success`)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static updateContact (id, name, telp, company, email) {
        Contact.update(id, name, telp, company, email)
        .then(() => {
            View.showResult(`Update contact data ${name} success`)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static deleteContact (id) {
        Contact.delete(id)
        .then(() => {
            View.showResult(`Delete contact data ID: ${id} success`)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static showContact () {
        Contact.show()
        .then((data) => {
            console.log("SHOW DATA CONTACT -------------------");
            View.showTable(data)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static seedContacts () {
        Contact.seed()
        .then(() => {
            View.showResult("SEED DATA GROUP -------------------")
        })
        .catch((err) => {
            View.showError(err)
        })
    }

}

module.exports = ControllerContact;
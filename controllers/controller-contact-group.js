const ContactGroup = require('../models/contact-group')
const View_Contact_Group = require ('../views/view-contact-group')

class Controller_Contact_Group {
    static assign(contactId, groupId) {
        ContactGroup.assign(contactId, groupId)
        .then(data => {
            View_Contact_Group.showContactsGroups(data)
        })
        .catch(err => {
            View_Contact_Group.displayError(err)
        })
    }

    static show() {
        ContactGroup.show()
        .then(data => {
            View_Contact_Group.showContactsGroups(data)
        })
        .catch(err => {
            View_Contact_Group.displayError(err)
        })
    }
}

module.exports = Controller_Contact_Group
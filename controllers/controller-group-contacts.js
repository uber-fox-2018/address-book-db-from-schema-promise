const GroupContact = require('../models/group-contacts')
const View = require('../views/group-contact-view')

class ControllerGroupContact {
    static showAll(){
        GroupContact.showAll()
        .then((success) => {
            View.showData(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static assign(contactId,groupId){
        GroupContact.assign(contactId,groupId)
        .then((success) => {
            View.showSuccess(success)
        })
        .catch((err) => {
            View.showError(err)
        })
    }
}

module.exports = ControllerGroupContact
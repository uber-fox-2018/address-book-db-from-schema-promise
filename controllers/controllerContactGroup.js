const ContactGroup = require('../models/contact-group')
const View = require('../view')

class ControllerContactGroup {

    static seedContactGroup () {
        ContactGroup.seed()
        .then(() => {
            View.showResult("SEED DATA GROUP -------------------")
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static showGroup(groupName) {
        ContactGroup.show(groupName)
        .then((data) => {
            View.showTable(data)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static assignContact(contactID, groupID) {
        ContactGroup.assign(contactID, groupID)
        .then(() => {
            View.showResult(`Contact with ID: ${contactID} has been assign to Group with ID: ${groupID}`)
        })
        .catch((err) => {
            View.showError(err)
        })
    }
}

module.exports = ControllerContactGroup;
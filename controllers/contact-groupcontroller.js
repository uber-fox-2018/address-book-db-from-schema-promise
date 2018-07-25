const ContactGroup = require('../models/contact-group.js');
const View = require('../views/view.js');

class ContactGroupController {

    static transferContactGroups() {
        ContactGroup.transferContactGroups()
        .then(contactgroupsData => {
            View.displayMessage(contactgroupsData);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

}

module.exports = ContactGroupController;
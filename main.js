const ContactController = require('./controllers/contactcontroller.js');
const GroupController = require('./controllers/groupcontroller.js');
const ContactGroupController = require('./controllers/contact-groupcontroller.js');

const argv = process.argv;
var table = argv[2];
var command = argv[3];

if (table == 'Contacts') {
    if (command == 'transfer') {
        ContactController.transferContacts();

    } else if (command == 'addContact') {
        let name = argv[4];
        let company_name = argv[5];
        let phone_number = argv[6];
        let email = argv[7];
        ContactController.createContact(name, company_name, phone_number, email);

    } else if (command == 'updateContact') {
        let id = argv[4];
        let column = argv[5];
        let value_edited = argv[6];
        ContactController.updateContact(id, column, value_edited);

    } else if (command == 'deleteContact') {
        let id = argv[4];
        ContactController.deleteContact(id);

    } else if (command == 'showContact') {
        let id = argv[4];
        ContactController.showContact(id);

    } else if (command == 'assignContact') {
        let contactName = argv[4];
        let groupName = argv[5];
        ContactController.assignContact(contactName, groupName);
    }


} else if (table == 'Groups') {
    if (command == 'transfer') {
        GroupController.transferGroups();

    } else if (command == 'addGroup') {
        let name = argv[4];
        GroupController.createGroup(name);
        
    } else if (command == 'updateGroup') {
        let id = argv[4];
        let name = argv[5];
        GroupController.updateGroup(id, name);

    } else if (command == 'deleteGroup') {
        let id = argv[4];
        GroupController.deleteGroup(id);

    } else if (command == 'showGroup') {
        let name = argv[4];
        GroupController.showGroup(name);
    }


} else if (table == 'ContactGroups') {
    if (command == 'transfer') {
        ContactGroupController.transferContactGroups();
    }
}
const Controller_Contact = require('./controllers/controller-contact')
const Controller_Group = require('./controllers/controller-group')
const Controller_Contact_Group = require('./controllers/controller-contact-group')

const argv = process.argv
const command = argv[2]

if (command == 'help') {

    console.log(`============== MENU =================`);
    console.log(`node main.js addContact <name> <company> <phone> <email>`);
    console.log(`node main.js editContact <id> <name> <company> <phone> <email>`);
    console.log(`node main.js deleteContact <id>`);
    console.log(`node main.js addGroup <group_name>`);
    console.log(`node main.js editGroup <id> <group_name>`);
    console.log(`node main.js deleteGroup <id>`);
    console.log(`node main.js assign <contactId> <groupId>`);
    console.log(`node main.js show `);

} else if (command == 'addContact') {

    let name = argv[3]
    let company_name = argv[4]
    let phone_number = argv[5]
    let email = argv[6]

    Controller_Contact.addContact(name, company_name, phone_number, email)

} else if (command == 'editContact') {

    let contactId = argv[3]
    let column = argv[4]
    let newValue = argv[5]

    Controller_Contact.editContact(contactId, column, newValue)

} else if (command == 'deleteContact') {

    let contactId = argv[3]
    Controller_Contact.deleteContact(contactId)

} else if (command == 'addGroup') {

    let groupName = argv[3]
    Controller_Group.addGroup(groupName)

} else if (command == 'editGroup') {

    let groupId = argv[3]
    let column = argv[4]
    let newValue = argv[5]

    Controller_Group.editGroup(groupId, column, newValue)

} else if (command == 'deleteGroup') {

    let id = argv[3]

    Controller_Group.deleteGroup(id)

} else if (command == 'assign') {

    let contactId = argv[3]
    let groupId = argv[4]

    Controller_Contact_Group.assign(contactId, groupId)

} else if (command == 'show') {

    Controller_Contact_Group.show()
}
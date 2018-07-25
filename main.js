const ControllerContact = require('./controllers/controller-contact')
const ControllerGroup = require('./controllers/controller-group')
const ControllerGroupContact = require('./controllers/controller-group-contacts')
const argv = process.argv
const command = argv[2]

if (command == 'help') {
    console.log(`==============HELP LIST=================`);
    console.log(`node main.js add-contact <name> <company> <phone> <email>`);
    console.log(`node main.js delete-contact <id>`);
    console.log(`node main.js edit-contact <id> <column> <input>`);
    console.log(`node main.js show-contacts`);
    console.log(`node main.js find-contact`);
    console.log(`node main.js add-group <group_name>`);
    console.log(`node main.js delete-group <id>`);
    console.log(`node main.js edit-group <id> <input>`);
    console.log(`node main.js show-groups`);
    console.log(`node main.js find-group`);
    console.log(`node main.js show-group-contacts`);
    console.log(`node main.js assign <contactId> <groupId>`);
}else if (command == 'add-contact') {
    let name = argv[3]
    let company = argv[4]
    let phone = argv[5]
    let email = argv[6]
    ControllerContact.add(name,company,phone,email)
}else if (command == 'delete-contact') {
    let id = argv[3]
    ControllerContact.remove(id)
}else if (command == 'edit-contact') {
    let id  = argv[3]
    let column = argv[4]
    let input = argv[5]
    ControllerContact.edit(id,column,input)
}else if (command == 'show-contacts') {
    ControllerContact.showAll()
}else if (command == 'find-contact') {
    let id = argv[3]
    ControllerContact.findById(id)
}else if (command == 'add-group') {
    let group_name = argv[3]
    ControllerGroup.add(group_name,company,phone,email)
}else if (command == 'delete-group') {
    let id = argv[3]
    ControllerGroup.remove(id)
}else if (command == 'edit-group') {
    let id  = argv[3]
    let input = argv[4]
    ControllerGroup.edit(id,input)
}else if (command == 'show-groups') {
    ControllerGroup.showAll()
}else if (command == 'find-group') {
    let id = argv[3]
    ControllerGroup.findById(id)
}else if (command == 'show-group-contacts') {
    ControllerGroupContact.showAll()
}else if (command == 'assign') {
    let contactId = argv[3]
    let groupId = argv[4]
    ControllerGroupContact.assign(contactId,groupId)
}

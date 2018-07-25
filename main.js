const Controller = require('./controller/controllers')
const ControllerContacts = Controller.ControllerContacts
const ControllerGroups = Controller.ControllerGroups
const ControllerGroupContacts = Controller.ControllerGroupContacts
const argv = process.argv.slice(2)
const command = argv[0]
const input = argv.slice(1)

class Application {
    static selectorMenu(command, input) {
        switch (command) {
            case 'insertContact':
                var params = {
                    name: input[0],
                    company: input[1],
                    phoneNumber: input[2],
                    email: input[3],
                }
                ControllerContacts.insertContact(params.name, params.company, params.phoneNumber, params.email)
                break;
            case 'editContact':
                var params = {
                    name: input[0],
                    company: input[1],
                    phoneNumber: input[2],
                    email: input[3],
                    id: input[4]
                }
                ControllerContacts.editContact(params.name, params.company, params.phoneNumber, params.email, params.id)
                break;
            case 'showContacts':
                ControllerContacts.showContacts()
                break;
            case 'removeContact':
                var name = input[0]
                ControllerContacts.removeContact(name)
                break;
            case 'insertGroup':
                var params = {
                    name: input[0]
                }
                ControllerGroups.insertGroup(params.name)
                break;
            case 'editGroup':
                var params = {
                    name: input[0],
                    id: input[1]
                }
                ControllerGroups.editGroup(params.name, params.id)
                break;
            case 'showGroups':
                ControllerGroups.showGroups()
                break;
            case 'removeGroup':
                var name = input[0]
                ControllerGroups.removeGroup(name)
                break;
            case 'insertContactToGroup':
                var params = {
                    nameContact: input[0],
                    groupName: input[1]
                }
                ControllerGroupContacts.insertGroupContact(params.nameContact, params.groupName)
                break;
            case 'showGroupContacts':
                ControllerGroupContacts.showGroupContacts()
                break;
            case 'moveContactToGroup':
                var params = {
                    nameContact: input[0],
                    groupName: input[1]
                }
                ControllerGroupContacts.editGroupContact(params.nameContact, params.groupName)
                break;
            case 'removeContactGroup':
                var id = input[0]
                ControllerGroupContacts.removeGroupContact(id)
                break;
            case 'findContacts':
                var nameColumn = input.slice(0, 2)
                var value = input.slice(2, 4)
                var operand = input[4]
                var operand2 = input[5]
                ControllerContacts.find(nameColumn, value, operand, operand2)
                break;
            default:
                ControllerContacts.menu()
        }
    }
}

Application.selectorMenu(command, input)
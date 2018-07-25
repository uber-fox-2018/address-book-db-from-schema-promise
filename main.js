const [ table, command, ...args ] = process.argv.slice(2)
const controllerContact = require('./controller/controller_contact')
const controllerGroup = require('./controller/controller_group')
const controllerContactGroup = require('./controller/controller_contact_group')
const controllerMenuHelp = require('./controller/controller_menu_help')

switch(table) {
  case 'contact': {
    switch(command) {
      case 'addContact': {
        controllerContact.save(...args)
        break
      }
      case 'update': {
        controllerContact.update(...args)
        break
      }
      case 'delete': {
        controllerContact.remove(...args)
        break
      }
      case 'find': {
        controllerContact.find(...args)
        break
      }
      case 'assignContact': {
        controllerContactGroup.assignContact(...args)
        break
      }
      default: {
        controllerMenuHelp.showHelp()
      }
    }
    break
  }
  case 'group': {
    switch(command) {
      case 'addGroup': {
        controllerGroup.save(...args)
        break
      }
      case 'update': {
        controllerGroup.update(...args)
        break
      }
      case 'delete': {
        controllerGroup.remove(...args)
        break
      }
      default: {
        controllerMenuHelp.showHelp()
      }
    }
    break
  }
  case 'showContact': {
    controllerContactGroup.showContact()
    break
  }
  case 'showGroup': {
    controllerContactGroup.showGroup()
    break
  }
  default: {
    controllerMenuHelp.showHelp()
  }
}

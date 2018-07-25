const model = require('../model/model')
const modelGroupContact = model.modelGroupContact
const View = require('../view/views')

class GroupContact {
  constructor(contactId, groupId) {
    this.contactId = contactId;
    this.groupId = groupId
  }
}

class ControllerGroupContact {
  static insertGroupContact(contactName, groupName) {
    modelGroupContact.insertGroupContact(contactName, groupName)
      .then(msg => {
        View.displayMessage(msg)
      })
      .catch(err => {
        View.displayErrorMessage(err.message)
      })
  }

  static showGroupContacts() {
    modelGroupContact.showGroupContact()
    .then(datas => {
      datas.forEach(data => {
        View.displayMessage(`${data.id}. Contact: ${data.name} | Group: ${data.groupName}`)
      })
    })
    .catch(err => {
      View.displayErrorMessage(err.message)
    })
  }

  static editGroupContact(nameContact, nameGroup) {
    modelGroupContact.editGroupContact(nameContact, nameGroup)
    .then(msg => {
      View.displayMessage(msg)
    })
    .catch(err => {
      View.displayErrorMessage(err)
    })
  }

  static removeGroupContact(id) {
    modelGroupContact.removeGroupContact(id)
    .then(msg => {
      View.displayMessage(msg)
    })
    .catch(err => {
      View.displayErrorMessage(err)
    })
  }

}

module.exports = ControllerGroupContact
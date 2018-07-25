const model = require('../model/model')
const ModelContact = model.modelContact
const View = require('../view/views')

class Contact {
  constructor(name, company, phoneNumber, email) {
    this.name = name;
    this.company = company;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}

class ControllerContact {

  static menu() {
    View.displayMessage(`
        ----------------------------MENU-----------------------------------
        $ node main.js insertContact <name> <company> <phoneNumber> <email>
        $ node main.js showContacts (just Contacts)
        $ node main.js editContact <name> <company> <phoneNumber> <email> <idContact>
        $ node main.js removeContact <name>
        $ node main.js insertGroup <groupName>
        $ node main.js editGroup <groupName> <id>
        $ node main.js showGroups (just Groups)
        $ node main.js removeGroup <name>
        $ node main.js insertContactToGroup <nameContact> <nameGroup>
        $ node main.js showGroupContacts (Contacts In Group)
        $ node main.js moveContactToGroup <contactName> <newGroup>
        $ node main.js removeContactGroup <id>
        $ node main.js findContacts <nameCol1> <nameCol2> <value1> <value2> <operand1> <operand2>
        ----------------------------Fajar's ORM-----------------------------------
        `)
  }
  
  static insertContact(name, company, phoneNumber, email) {
    let newContact = new Contact(name, company, phoneNumber, email)
    ModelContact.insertContact(newContact.name, newContact.company, newContact.phoneNumber, newContact.email)
      .then(data => {
        View.displayMessage(`Success to add Contact: ${name} with Number: ${phoneNumber}. Total Contact: ${data.lastID}`)
      })
      .catch(err => {
        View.displayErrorMessage(err.message)
      })
  }

  static showContacts() {
    ModelContact.showContacts()
    .then(datas => {
      let count = 1
      datas.forEach(data => {
        View.displayMessage(`${count}. name: ${data.name}, phone_number: ${data.phoneNumber}`)
        count++
      })
    })
    .catch(err => {
      View.displayErrorMessage(err.message)
    })
  }

  static editContact(name, company, phoneNumber, email, id) {
    ModelContact.editContact(name, company, phoneNumber, email, id)
    .then(msg => {
      View.displayMessage(msg)
    })
    .catch(err => {
      View.displayErrorMessage(err.message)
    })
  }

  static removeContact(name) {
    ModelContact.removeContact(name) 
    .then(msg => {
      View.displayMessage(msg)
    })
    .catch(err => {
      View.displayErrorMessage(err.message)
    })
  }

  static find(nameColumn, value, operand, operand2) {
    ModelContact.find(nameColumn, value, operand, operand2)
    .then(datas => {
      let count = 1
        datas.forEach(data => {
          View.displayMessage(`${count}. Contact: ${data.name} Phone_number : ${data.phoneNumber}`)
          count++
        })
    })
    .catch(err => {
      View.displayErrorMessage(err.message)
    })
  }
}


module.exports = ControllerContact
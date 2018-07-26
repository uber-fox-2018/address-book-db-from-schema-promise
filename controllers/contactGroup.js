const Model = require ('../models/contactGroup');
const View = require ('../views/view');

class ContactGroup {
  static help (){
    let messages = [
      `node main.js help`,
      `node main.js add contact "<name>" <company> <phone number> "<address>"`,
      `node main.js add group "<name>"`,
      `node main.js add contactToGroup <contactId> <groupId>`,

      `node main.js update contact <id> <column name> "<new data>" <column name> "<new data>" <column name> "<new data>" ....`,
      `node main.js update group <id> name <new data>`,
      `node main.js update contactGroup <id> contactId OR groupId <new data>`,

      `node main.js delete contact <id>`,
      `node main.js delete group <id>`,
      `node main.js delete contactGroup <id>`,

      `node main.js find contact <column name> <keyword> <column name> <keyword>.... <operator> <option>`,
      `ex: node main.js find contact name brian company hacktiv LIKE OR`,

      `node main.js show contact <id>`,
    ]
    messages.forEach((message) => {
      View.display(message);
    })
  }

  static insert (inputArr){
    Model.insert (inputArr)
    .then (result => {
      View.display(result.message);
    })
    .catch (err => {
      View.display(err.message);
    })
  }

  static update (inputArr){
    Model.update (inputArr[0], inputArr.slice(1))
    .then (result => {
      View.display(result.message);
    })
    .catch (err => {
      View.display(err.message);
    })
  }

  static remove (input){
    Model.remove (input)
    .then (result => {
      View.display(result.message);
    })
    .catch (err => {
      View.display(err.message);
    })
  }
}

module.exports = ContactGroup;
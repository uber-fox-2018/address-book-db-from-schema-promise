const Contact = require("../model/contact");
const Group = require("../model/group");
const GroupContact = require("../model/contactGroup");
const View = require("../view");
let view = new View();
let contact = new Contact();
let group = new Group();
let groupContact = new GroupContact();

class ControllerContactGroup {
  assign(contactName, groupName) {
    contact.name = contactName;
    group.name = groupName;
    groupContact
      .assign(contactName, groupName)
      .then(msg => {
        view.display(msg);
      })
      .catch(err => {
        view.display(err);
      });
  }
}

module.exports = ControllerContactGroup;


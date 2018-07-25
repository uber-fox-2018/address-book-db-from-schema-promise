const Contact = require("../model/contact");
const Group = require("../model/group");
const View = require("../view");

let view = new View();
let contact = new Contact();
let group = new Group();

class GroupController {
  c_addGroup(name) {
    let group = new Group(name);
    group
      .save()
      .then(msg => {
        view.display(msg);
      })
      .catch(err => {
        view.display(err);
      });
  }

  c_updateGroup(id, value) {
    group.name = value;
    // contact.office = value;
    // contact.phone = value;
    // contact.email = value;
    group
      .update(id, value)
      .then(msg => {
        view.display(msg);
      })
      .catch(err => {
        view.display(err);
      });
  }

  c_deleteGroup(id) {
    group
      .remove(id)
      .then(msg => {
        view.display(msg);
      })
      .catch(err => {
        view.display(err);
      });
  }

  c_showGroup(id) {
    group
      .show(id)
      .then(msg => {
        view.display(msg);
      })
      .catch(err => {
        view.display(err);
      });
  }
}

module.exports = GroupController;

const Contact = require("../model/contact.js");
const Group = require("../model/group");
const View = require("../view");

let view = new View();
let contact = new Contact();
let group = new Group();

class ContactController {
  help() {
    view.help();
  }

  c_addContact() {
    let contact = new Contact(name, office, phone, email);
    contact
      .save()
      .then(msg => {
        view.display(msg);
      })
      .catch(err => {
        view.display(err);
      });
  }

  c_updateContact(id, value) {
    contact.name = value;
    contact
      .update(id, value)
      .then(msg => {
        view.display(msg);
      })
      .catch(err => {
        view.display(err);
      });
  }

  c_deleteContact(id) {
    contact
      .remove(id)
      .then(msg => {
        view.display(msg);
      })
      .catch(err => {
        view.display(err);
      });
  }

  c_showContact(id) {
    contact
      .show(id)
      .then(msg => {
        view.display(msg);
      })
      .catch(err => {
        view.display(err);
      });
  }

  c_find(columnRow, constraint) {
    contact.findContact(columnRow, constraint)
    .then(msg => {
      view.display(msg);
    })
    .catch(err => {
      view.display(err);
    });
  }
}

module.exports = ContactController;

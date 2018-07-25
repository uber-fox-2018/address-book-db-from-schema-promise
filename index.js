const argv = process.argv.slice(2);
const command = argv[0];
const input = argv[1];

const ContactController = require("./controller/controllerContact");
const GroupController = require("./controller/controllerGroup");
const ControllerContactGroup = require("./controller/controllerContactGroup");
let groupController = new GroupController();
let contact_controller = new ContactController();
let controllerContactGroup = new ControllerContactGroup();

switch (command) {
  case undefined:
    contact_controller.help();
    break;
}

if (command == `contact`) {
  switch (input) {
    case `add`:
      name = argv[2];
      phone = argv[3];
      email = argv[4];
      data = argv.slice(5);
      office = data.join(" ");
      contact_controller.c_addContact();
      break;
  }

  switch (input) {
    case `update`:
      id = argv[2];
      data = argv.slice(3);
      value = data.join(" ");
      contact_controller.c_updateContact(id, value);
      break;
  }

  switch (input) {
    case `delete`:
      id = argv[2];
      contact_controller.c_deleteContact(id);
      break;
  }

  switch (input) {
    case `find`:
      data = argv[2];
      columnRow = data.toString().split(":");
      data2 = argv.slice(3);
      constraint = data2.join(" ");
      console.log(`argv-> `+ columnRow,constraint);
      
      contact_controller.c_find(columnRow, constraint);
      break;
  }

  switch (input) {
    case `show`:
      id = argv[2];
      contact_controller.c_showContact(id);
      break;
  }
}

if (command == `group`) {
  switch (input) {
    case `add`:
      data = argv.slice(2);
      name = data.join(" ");
      groupController.c_addGroup(name);
      break;
  }

  switch (input) {
    case `update`:
      id = argv[2];
      data = argv.slice(3);
      value = data.join(" ");
      groupController.c_updateGroup(id, value);
      break;
  }

  switch (input) {
    case `delete`:
      id = argv[2];
      groupController.c_deleteGroup(id);
      break;
  }

  switch (input) {
    case `show`:
      id = argv[2];
      groupController.c_showGroup(id);
      break;
  }

  switch (input) {
    case `assign`:
      contactName = argv[2];
      data2 = argv.slice(3);
      groupName = data2.join(" ");
      controllerContactGroup.assign(contactName, groupName);
      break;
  }
}

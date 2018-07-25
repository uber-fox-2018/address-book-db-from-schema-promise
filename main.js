
const Controller = require("./controller.js");

const Contact = Controller.Contact;
const contactsData = require("./contacts.json")

const Group = Controller.Group;
const groupsData = require("./groups.json")

const ContactGroup = Controller.ContactGroup;
const contactGroupData = require("./contactGroups.json")

/* COMMANDS */
// Contact.lastId();
// Contact.save(contactsData);
// Contact.create({name: "ben", company: "DDD", phone: "081317644444", email: "ben@gmail.com"});
// Contact.update({name: "Ruby"}, {id : 4});
// Contact.delete({id : 4});
// Contact.show();

// Group.lastId();
// Group.save(groupsData);
// Group.create({name: "coding"});
// Group.update({name: "advertising"}, {id : 4});
// Group.delete({id : 4});
// Group.show();

// ContactGroup.lastId();
// ContactGroup.save(contactGroupData);
// ContactGroup.create({contactId: 2, groupId: 1});
// ContactGroup.update({contactId: 1, groupId: 2}, {id : 4})
// ContactGroup.delete({id : 7});
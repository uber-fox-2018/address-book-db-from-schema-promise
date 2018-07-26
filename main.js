const Contact = require ('./controllers/contact');
const Group = require ('./controllers/group');
const ContactGroup = require ('./controllers/contactGroup');
const command = process.argv[2];
const target = process.argv[3];
const input = process.argv.slice(4);

if (command == 'help'){
  Contact.help();
} else if (command == 'add'){
  if (target == 'contact'){
    Contact.insert(input);
  } else if (target == 'group'){
    Group.insert(input[0]);
  } else if (target == 'contactToGroup'){
    ContactGroup.insert(input);
  }
} else if (command == 'update'){
  if (target == 'contact'){
    Contact.update(input);
  } else if (target == 'group'){
    Group.update(input);
  } else if (target == 'contactGroup'){
    ContactGroup.update(input);
  }
} else if (command == 'delete'){
  if (target == 'contact'){
    Contact.remove(input[0]);
  } else if (target == 'group'){
    Group.remove(input[0]);
  } else if (target == 'contactGroup'){
    ContactGroup.remove(input[0]);
  }
} else if (command == 'show'){
  Contact.show(input[0]);
} else if (command == 'find'){
  Contact.find(input)
} else {
  Contact.help();
}
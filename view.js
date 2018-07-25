class View {
    static Display(data) {
        console.clear();
        console.log(data)
    }

    static help() {
        console.clear();
        console.log("Bantuan Address Book");
        console.log("======================\n")
        console.log("Add Contact\n$_ node main.js addContact <name> <company> <uniq phone> <uniq email>")
        console.log("Contact List\n$_ node main.js contactList")
        console.log("Update Contact\n$_ node main.js updateContact <id> <name> <company> <uniq phone> <uniq email>")
        console.log("Delete Contact\n$_ node main.js deleteContact <id>")
        console.log("Find Contact\n$_ node main.js findContact <id>")

        console.log("======================\n")
        console.log("Add Group\n$_ node main.js addGroup <name>")
        console.log("Group List\n$_ node main.js groupList")
        console.log("Update Group\n$_ node main.js updateGroup <id> <name>")
        console.log("Delete Group\n$_ node main.js deleteGroup <id>")
        console.log("Find Group\n$_ node main.js findGroup <id>")

        console.log("======================\n")
        console.log("Add ContactGroup\n$_ node main.js addContactGroup <contactId> <groupId>")
        console.log("ContactGroup List\n$_ node main.js contactGroupList")
        console.log("Update ContactGroup\n$_ node main.js updateContactGroup <id> <contactId> <groupId>")
        console.log("Delete ContactGroup\n$_ node main.js deleteContactGroup <id>")
        console.log("Find ContactGroup\n$_ node main.js findContactGroup <id>")
    }
}

module.exports = View;
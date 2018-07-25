const argv = process.argv.slice(2);

const MContact = require('./contact.js');
const MGroup = require('./group.js');
const MContactGroup = require('./contact-group.js');
const View = require('./view.js')

class Controller {
    constructor(input) {
        this._argv = input;
        this.modelContact = new MContact;
        this.modelGroup = new MGroup;
        this.modelContactGroup = new MContactGroup;
        this.routes();
    }

    // add contact in promise
    addContact() {
        let name    = this._argv[1];
        let company = this._argv[2];
        let phone   = this._argv[3];
        let email   = this._argv[4];

        this.modelContact.addContact(name, company, phone, email)
        .then((id) => {
            this.modelContact.findContact(id)
            .then((data) => {
                View.Display(data)
            })
            .catch((err)=> {
                View.Display(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    // list contact in promise
    contactList() {
        this.modelContact.contactList()
            .then((data) => {
                View.Display(data)
            })
            .catch((err)=> {
                View.Display(err)
            })
    }

    // update in promise
    updateContact() {
        let id      = this._argv[1];
        let name    = this._argv[2];
        let company = this._argv[3];
        let phone   = this._argv[4];
        let email   = this._argv[5];
        this.modelContact.updateContact(id, name, company, phone, email)
        .then((data)=> {
            this.modelContact.findContact(id)
            .then((data) => {
                View.Display(data)
            })
            .catch((err)=> {
                View.Display(err)
            })
        })
        .catch((err)=>{
            View.Display(err)
        })
    }

    // delete contact promise
    deleteContact() {
        let id      = this._argv[1];
        this.modelContact.deleteContact(id)
        .then((data)=> {
            let msg = `Berhasil menghapus id ${data}`;
            View.Display(msg)
        })
        .catch((err) => {
            View.Display(err)
        })
        
    }

    // find contact in promise
    findContact() {
        let id = this._argv[1];
        this.modelContact.findContact(id)
            .then((data) => {
                View.Display(data)
            })
            .catch((err)=> {
                View.Display(err)
            })
    }

    ///////

    addGroup() {
        let name    = this._argv[1];

        this.modelGroup.addContactGroup(name)
    }

    groupList() {
        this.modelGroup.groupList( (data) => {
            console.log(data);
        })
    }

    updateGroup() {
        let id      = this._argv[1];
        let name    = this._argv[2];
        
        this.modelGroup.updateGroup(id, name);
        let msg = `Berhasil`;
        View.Display(msg)
    }

    deleteGroup() {
        let id      = this._argv[1];
        this.modelGroup.deleteGroup(id);
        let msg = `Berhasil`;
        View.Display(msg)
    }

    ////////////////

    addContactGroup() {
        let contactId    = this._argv[1];
        let groupId    = this._argv[1];

        this.modelContactGroup.addContactGroup(contactId, groupId);
        let msg = `Berhasil`;
        View.Display(msg)
    }

    contactGroupList() {
        this.modelContactGroup.updateContactGroup( (data) => {
            console.log(data);
        })
    }

    updateContactGroup() {
        let id      = this._argv[1];
        let contactId    = this._argv[2];
        let groupId    = this._argv[2];
        
        this.modelContactGroup.updateContactGroup(id, contactId, groupId);
        let msg = `Berhasil`;
        View.Display(msg)
    }

    deleteContactGroup() {
        let id      = this._argv[1];
        this.modelContactGroup.deleteContactGroup(id);
        let msg = `Berhasil`;
        View.Display(msg)
    }

    help() {
        View.help()
    }

    routes() {
        let cmd = this._argv[0];
        // console.log(cmd)
        switch (cmd) {
            case 'addContact':
                this.addContact();
                break;
            case 'contactList':
                this.contactList();
                break;
            case 'updateContact':
                this.updateContact();
                break;
            case 'deleteContact':
                this.deleteContact();
                break;
            case 'findContact':
                this.findContact();
                break;
                
            case 'addGroup':
                this.addGroup();
                break;
            case 'groupList':
                this.groupList();
                break;
            case 'updateGroup':
                this.updateGroup();
                break;
            case 'deleteGroup':
                this.deleteGroup();
                break;

            case 'addContactGroup':
                this.addContactGroup();
                break;
            case 'contactGroupList':
                this.contactGroupList();
                break;
            case 'updateContactGroup':
                this.updateContactGroup();
                break;
            case 'deleteContactGroup':
                this.deleteContactGroup();
                break;

            default:
                this.help();
                break;
        }
    }

}

new Controller(argv)
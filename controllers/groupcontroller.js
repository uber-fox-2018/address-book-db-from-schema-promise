const Group = require('../models/group.js');
const View = require('../views/view.js');

class GroupController {

    static transferGroups() {
        Group.transferGroups()
        .then(groupsData => {
            View.displayMessage(groupsData);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

    static createGroup(name) {
        Group.createGroup(name)
        .then(group => {
            View.displayMessage(group);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

    static updateGroup(id, name) {
        Group.updateGroup(id, name)
        .then(updatedGroup => {
            View.displayMessage(updatedGroup);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

    static deleteGroup(id) {
        Group.deleteGroup(id)
        .then(deletedGroup => {
            View.displayMessage(deletedGroup);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

    static showGroup(name) {
        Group.showGroup(name)
        .then(group => {
            View.displayMessage(group);
        })
        .catch(err => {
            View.displayError(err);
        })
    }

}

module.exports = GroupController;
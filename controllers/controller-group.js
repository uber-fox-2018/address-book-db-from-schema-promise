const Group = require('../models/group')
const View_Group = require('../views/view-group')

class Controller_Group {
    static addGroup(groupName) {
        Group.addGroup(groupName)
        .then(data => {
            View_Group.displayMessage(data)
        })
        .catch(err => {
            View_Group.displayError(err)
        })
    }

    static editGroup(id, column, newValue) {
        Group.editGroup(id, column, newValue)
        .then(data => {
            View_Group.displayMessage(data)
        })
        .catch(err => {
            View_Group.displayError(err)
        })
    }
    
    static deleteGroup(id) {
        Group.deleteGroup(id)
        .then(data => {
            View_Group.displayMessage(data)
        })
        .catch(err => {
            View_Group.displayError(err)
        })
    }
}

module.exports = Controller_Group
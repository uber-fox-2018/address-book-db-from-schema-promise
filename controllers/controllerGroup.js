const Group = require('../models/group')
const View = require('../view')

class ControllerGroup {

    static createGroup (groupName) {
        Group.create(groupName)
        .then(() => {
            View.showResult(`Create Group data ${groupName} success`)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static updateGroup (id, groupName) {
        Group.update(id, groupName)
        .then(() => {
            View.showResult(`Update Group data ${groupName} success`)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static deleteGroup (id) {
        Group.delete(id)
        .then(() => {
            View.showResult(`Delete Group data ID: ${id} success`)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static showGroup () {
        Group.show()
        .then((data) => {
            console.log("SHOW DATA GROUP -------------------");
            View.showTable(data)
        })
        .catch((err) => {
            View.showError(err)
        })
    }

    static seedGroups () {
        Group.seed()
        .then(() => {
            View.showResult("SEED DATA GROUP -------------------")
        })
        .catch((err) => {
            View.showError(err)
        })
    }
}

module.exports = ControllerGroup;
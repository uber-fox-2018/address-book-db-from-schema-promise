const model = require('../model/model')
const ModelGroup = model.modelGroup
const View = require('../view/views')

class Group {
  constructor(groupName) {
    this.groupName = groupName
  }
}

class ControllerGroup {
  static insertGroup(name) {
    let newGroup = new Group(name)
    ModelGroup.insertGroup(newGroup.groupName)
      .then(data => {
        View.displayMessage(`Success to add Group: ${name}. Total Group: ${data.lastID}`)
      })
      .catch(err => {
        View.displayErrorMessage(err.message)
      })
  }

  static showGroups() {
    ModelGroup.showGroups()
      .then(datas => {
        let count = 1
        datas.forEach(data => {
          View.displayMessage(`${count}. name: ${data.groupName}`)
          count++
        })
      })
      .catch(err => {
        View.displayErrorMessage(err.message)
      })
  }

  static editGroup(name, id) {
    ModelGroup.editGroup(name, id)
      .then(msg => {
        View.displayMessage(msg)
      })
      .catch(err => {
        View.displayErrorMessage(err.message)
      })
  }

  static removeGroup(name) {
    ModelGroup.removeGroup(name)
      .then(msg => {
        View.displayMessage(msg)
      })
      .catch(err => {
        View.displayErrorMessage(err.message)
      })
  }
}

module.exports = ControllerGroup
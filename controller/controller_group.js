const modelGroup = require('../model/model_group')
const view = require('../view/view')

class ControllerGroup {
  static save(...data) {
    modelGroup.save([...data])
      .then(data => {
        let msg = `Group ${data.name_group} successfully add to group.`
        view.messageSucces(msg)
      })
      .catch(err => {
        view.messageErr(err)
      })
  }

  static update(...data) {
    modelGroup.update([...data])
      .then(data => {
        let msg = `Group with id ${data.id} successfully updated.`
        view.messageSucces(msg)
      })
      .catch(err => {
        view.messageErr(err.message)
      })
  }

  static remove(...data) {
    modelGroup.remove([...data])
      .then(data => {
        let msg = `Group with id ${data.id} success deleted`
        view.messageSucces(msg)
      })
      .catch(err => {
        view.messageErr(err)
      })
  }
}

module.exports = ControllerGroup
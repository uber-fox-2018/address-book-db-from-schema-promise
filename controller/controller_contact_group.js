const modelContactGroup = require('../model/model_contact_group')
const view = require('../view/view')

class ControllerContactGroup {
  static showContact() {
    modelContactGroup.showContact()
      .then(data => {
        view.showContact(data)
      })
      .catch(err => {
        view.messageErr(err)
      })
  }

  static showGroup() {
    modelContactGroup.showGroup()
      .then(data => {
        view.showGroup(data)
      })
      .catch(err => {
        view.messageErr(err)
      })
  }

  static assignContact(...data) {
    modelContactGroup.assignContact([...data])
      .then(() => {
        let msg = `Assign contact success`
        view.messageSucces(msg)
      })
      .catch(err => {
        view.messageErr(err)
      })
  }
}

module.exports = ControllerContactGroup
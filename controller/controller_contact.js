const modelContact = require('../model/model_contact')
const view = require('../view/view')

class ControllerContact {
  static save(...data) {
    modelContact.save([...data])
      .then(message => {
        let msg = `Contact name ${message.name} success add to contacts. Total Contact: ${message.totalContact}`
        view.messageSucces(msg)
      })
      .catch(() => {
        let messageErr = 'Contact already exists'
        view.messageErr(messageErr)
      })
  }

  static update(...data) {
    modelContact.update([...data])
      .then(message => {
        let msg = `Contact with id ${message.id} successfully update`
        view.messageSucces(msg)
      })
      .catch(() => {
        let messageErr = `No such column ${err.msgErr}`
        view.messageErr(messageErr)
      })
  }

  static remove(...data) {
    modelContact.remove([...data])
      .then(data => {
        let message = `Contact with name ${data.name} successfully deleted`
        view.messageSucces(message)
      })
      .catch(err => {
        view.messageErr(err.messageErr)
      })
  }

  static find(...data) {
    modelContact.find([...data])
      .then(data => {
        let arr = []
        data.map(dataFind => {
          arr.push(dataFind)
        })
        view.messageSucces(arr)
      })
      .catch(err => {
        view.messageErr(err.messageInfo)
      })
  }
}

module.exports = ControllerContact
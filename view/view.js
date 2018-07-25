const Table = require('cli-table')
const chalk = require('chalk')

class View {

  static showHelp() {
    console.log(`
      1. node main.js contact addContact [name] [perusahaan] [phone] [email]
      2. node main.js contact update [id] [name_column:value]
      3. node main.js contact delete [name:value]
      4. node main.js contact find [column_name:value, operator]
      5. node main.js group addGroup [value]
      6. node main.js group update [id] [name_column:value]
      7. node main.js group delete [id:value]
      8. node main.js showGroup
      9. node main.js showContact
      10. node main.js contact assignContact [name] [group]
    `)
  }

  static messageSucces(msg) {
    console.log(msg)
  }

  static messageErr(msg) {
    console.log(msg)
  }

  static showContact(data) {
    let table = new Table()
    table.push([chalk.blue('Name'), chalk.blue('Perusahaan'), chalk.blue('Email'), chalk.cyan('Group')])
    data.map(dataContact => {
      var list = []
      list.push(
        dataContact.contact_name,
        dataContact.perusahaan,
        dataContact.email,
        dataContact.name_group
      )
      table.push(list)
    })
    console.log(table.toString())
  }

  static showGroup(data) {
    let tabel = new Table()
    tabel.push(['Group', 'Name Contact'])
    data.map(dataGroup => {
      var list = []
      list.push(
        dataGroup.name_group,
        dataGroup.name
      )
      tabel.push(list)
    })
    console.log(tabel.toString())
  }

}

module.exports = View
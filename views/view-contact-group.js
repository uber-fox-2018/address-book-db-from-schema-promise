class View_Contact_Group {
    static showContactsGroups(data) {
        console.table(data)
    }

    static displayError(err) {
        console.log(err)
    }
}

module.exports = View_Contact_Group
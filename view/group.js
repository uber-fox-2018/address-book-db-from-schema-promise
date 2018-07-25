class View {

    static add(name) {
        console.log(`${name} has been added to group`)
    }

    static update() {
        console.log(`some data has been updated`);
    }

    static delete(id) {
        console.log(`data with id: ${id} has been deleted`)

    }

    static showGroup(data) {
        console.log(data)
    }

}

module.exports = View
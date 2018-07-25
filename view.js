class View {

    static showResult (result) {
        console.log(result);
    }

    static showError (err) {
        console.log(err);
    }

    static showTable (data) {
        console.table(data)
    }

}

module.exports = View;
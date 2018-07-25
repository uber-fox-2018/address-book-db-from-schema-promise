class View {
    static showError(err){
        console.log(err);
    }

    static showSuccess(data){
        console.log(data.msg);
    }

    static showData(data){
        console.log(data);
    }
}

module.exports = View
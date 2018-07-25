class View{
    static delete(id){
        console.log(`data with id: ${id} has been deleted`)
    }

    static showContact(data){
        console.log(data)
    }

    static showMessageAdd(name){
        console.log(`new contact ${name} has been added`)

    }

    static showMessageUpdate(){
        console.log(`some data has been updated`)
    }

    static errorMessage(err){
        console.log(err);
    }
}

module.exports = View
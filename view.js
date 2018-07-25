class Contact{
    static showError(err){
        console.log("Error!")
    }
    static showDoubleInput(err){
        console.log("No double input! Must be unique!");
    }

    static findLastId(result){
            console.log(result);
    }

    static display(result){
        console.log("Data has been saved successfully. Total data : ", result);
    }
    
    static update(result){
        if(result===0){
            console.log("no changes")
        }else{
            console.log("successfully updated")
        }
    }

    static delete(obj, result){
        if(result===0){
            console.log("nothing to be deleted");
        }else{
            console.log("successfully deleted from contacts: ", obj)
        }
    }

    static show(result){
        console.log(result);
    }
}

class Group{
    static showError(err){
        console.log("Error!")
    }
    static showDoubleInput(err){
        console.log("No double input! Must be unique!");
    }

    static findLastId(result){
            console.log(result);
    }

    static display(result){
        console.log("Data has been saved successfully. Total data : ", result);
    }
    
    static update(result){
        if(result===0){
            console.log("no changes")
        }else{
            console.log("successfully updated")
        }
    }

    static delete(obj, result){
        if(result===0){
            console.log("nothing to be deleted");
        }else{
            console.log("successfully deleted from contacts: ", obj)
        }
    }

    static show(result){
        console.log(result);
    }
}

class ContactGroup{
    static showError(err){
        console.log("Error!")
    }
    static showDoubleInput(err){
        console.log("No double input! Must be unique!");
    }

    static findLastId(result){
            console.log(result);
    }

    static display(result){
        console.log("Data has been saved successfully. Total data : ", result);
    }
    
    static update(result){
        if(result===0){
            console.log("no changes")
        }else{
            console.log("successfully updated")
        }
    }

    static delete(obj, result){
        if(result===0){
            console.log("nothing to be deleted");
        }else{
            console.log("successfully deleted from contacts: ", obj)
        }
    }
}

module.exports = {
    Contact : Contact,
    Group : Group,
    ContactGroup : ContactGroup
};

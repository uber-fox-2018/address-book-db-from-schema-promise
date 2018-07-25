
const Model = require('../model/grup')
const View = require('../view/view')
class Grup{
    static insert(namaGrup){
        Model.insert(namaGrup)
        .then(() =>{
            View.showMessage(`data has been inserted`)
        })

        .catch(err =>{
            View.showMessage(err.message)
        })
    }

    static update(id,namaGrup){
        Model.update(id,namaGrup)
        .then(() =>{
            View.showMessage(`data has been updated`)
        })

        .catch(err =>{
            View.showMessage(err.message)
        })
    }

    static delete(column, value){
        Model.delete(column, value)
        .then(() =>{
            View.showMessage(`data has been deleted`)
        })

        .catch(err =>{
            View.showMessage(err.message)
        })
    
    }

    static findGrup(column,value){
        Model.findGrup(column,value)
        .then((result) =>{
            View.showTable(result)
        })

        .catch(err =>{
            View.showMessage(err.message)
        })
    }
}

module.exports = Grup
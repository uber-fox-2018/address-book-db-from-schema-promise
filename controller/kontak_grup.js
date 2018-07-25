const Model = require('../model/kontak_grup')
const View = require('../view/view')

class KontakGrup{
    static insert(kontak_id, grup_id){
       Model.insert(kontak_id,grup_id)
       .then(result =>{
           View.showMessage(`data has been inserted`) 
       })

       .catch(err =>{
           View.showMessage(err.message)

       })  
    }

    static update(id,kontak_id,grup_id){
        Model.update(id,kontak_id,grup_id)
        .then(result =>{
            View.showMessage(`data has been updated`) 
        })
 
        .catch(err =>{
            View.showMessage(err.message)
 
        })     
    }

    static delete(id){
        Model.delete(id)
        .then(()=>{
            View.showMessage(`data succesfully deleted`)
        })

        .catch(err=>{
            View.showMessage(err.message)
        })
        
    }
}

module.exports = KontakGrup
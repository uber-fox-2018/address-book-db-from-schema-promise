const Model = require('../model/kontak')
const View = require('../view/view')

class Kontak{
    static insert(nama, nama_perusahaan, nomor_telp, email){
        Model.insert(nama,nama_perusahaan,nomor_telp,email)
        .then((response)=>{
            View.showMessage(`data has been inserted with id ${response}`)
        })

        .catch((err)=>{
            View.showMessage(err.message)
        })
    }

    static update(id, nama, nama_perusahaan, nomor_telp, email){
        Model.update(id, nama, nama_perusahaan, nomor_telp, email)
        .then(response =>{
            View.showMessage(`data has been updated`)
        })

        .catch((err)=>{
            View.showMessage(err.message)
        })
     
    }

    static delete(column,value){
        Model.delete(column,value)
        .then(response =>{
            View.showMessage(response.message)
        })

        .catch(err =>{
            View.showMessage(err.message)
        })
           
    }

    static findKontak(column, value){
        Model.findKontak(column, value)
        .then(result => {
           View.showTable(result)
        })

        .catch(err =>{
            View.showMessage(err.message)
        })

            
      
    }

    static showKontak(){
        Model.showKontak()
        .then(result =>{
            View.showTable(result)
        })

        .catch(err =>{
            View.showMessage(err.message)
        })
    }

    static request(column1, column2, value1, value2, operan, conjunction){
        Model.request(column1, column2, value1, value2, operan, conjunction)
        .then(result=>{
            View.showTable(result)
        })
        .catch(err =>{
            View.showMessage(err.message)
        })
    }
}

module.exports = Kontak
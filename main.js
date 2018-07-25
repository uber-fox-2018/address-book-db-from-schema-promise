
const ControllerKontak = require('./controller/kontak')
const ControllerGrup = require('./controller/grup')
const ControllerKontakGrup = require('./controller/kontak_grup')
const argv = process.argv
var command = argv[2]

switch (command) {
    case 'insertKontak':
                        var nama = argv[3]
                        var nama_perusahaan = argv[4]
                        var nomor_telp = argv[5]
                        var email = argv[6]
                        ControllerKontak.insert(nama, nama_perusahaan, nomor_telp, email)
                        break;
    case 'updateKontak':
                        var id = argv[3]
                        var nama = argv[4]
                        var nama_perusahaan = argv[5]
                        var nomor_telp = argv[6]
                        var email = argv[7]
                        ControllerKontak.update(id, nama, nama_perusahaan, nomor_telp, email)
                        break;

    case 'deleteKontak' : var column = argv[3]
                          var value = argv[4]
                          ControllerKontak.delete(column,value)
                          break;

    case 'findKontak':  var column = argv[3]
                        var value = argv[4]
                        ControllerKontak.findKontak(column, value)
                        break;
    case 'showKontak':
                        ControllerKontak.showKontak()
                        break;
    case 'insertGrup':
                        var namaGrup = argv[3]
                        ControllerGrup.insert(namaGrup)
                        break;
    case 'updateGrup':
                        var id = argv[3]
                        var namaGrup = argv[4]
                        ControllerGrup.update(id,namaGrup)
                        break;
    case 'deleteGrup':
                        var column = argv[3]
                        var value = argv[4]
                        ControllerGrup.delete(column, value)
                        break;
    case 'findGrup'  :
                        var column = argv[3]
                        var value = argv[4]
                        ControllerGrup.findGrup(column,value)
                        break;
    case 'insertKontakGrup' : 
                            var kontak_id = argv[3]
                            var grup_id = argv[4]
                            ControllerKontakGrup.insert(kontak_id,grup_id)
                            break;
    case 'updateKontakGrup' :
                            var id = argv[3]
                            var kontak_id = argv[4]
                            var grup_id = argv[5]
                            ControllerKontakGrup.update(id,kontak_id,grup_id)
                            break;
    case 'deleteKontakGrup' :
                            var id = argv[3]
                            ControllerKontakGrup.delete(id)
                            break;
    case 'request'          : 
                            var column1 = argv[3]
                            var column2 = argv[4]
                            var value1 = argv[5]
                            var value2 = argv[6]
                            var operan = argv[7]
                            var conjunction = argv[8]
                            ControllerKontak.request(column1, column2, value1, value2, operan, conjunction)
                            break;    
    default:
        break;
}




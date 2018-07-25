const createTable = require('./db/setup')
const seed = require('./db/seed-data')
const args = process.argv.slice(2)
const command = args[0]
const input1 = args[1]
const input2 = args[2]
const input3 = args[3]
const input4 = args[4]
const ControllerContact = require('./controller/contact')
const ControllerGroup = require('./controller/group')
const ControllerContactGroup = require('./controller/contact-group')


if(command === 'addContact' && input1 !== undefined && input2 !== undefined && input3 !==undefined && input4 !== undefined){
    ControllerContact.add(input1,input2,input3,input4)
}else if(command === 'updateContact' && input1 !== undefined && input2 !== undefined && input3 !== undefined){
    ControllerContact.update(input1,input2,input3)
}else if(command === "deleteContact" && input1 !== undefined){
    ControllerContact.delete(input1)
}else if(command === 'showContact'){
    ControllerContact.showContact()
}else if(command === 'addGroup' && input1 !== undefined){
    ControllerGroup.add(input1)
}else if(command === 'updateGroup' && input1 !== undefined && input2 !== undefined && input3 !== undefined){
    ControllerGroup.update(input1,input2,input3)
}else if(command === "deleteGroup" && input1 !== undefined){
    ControllerGroup.delete(input1)
}else if(command === 'showGroup'){
    ControllerGroup.showGroup() 
}else if(command === 'assignContact' && input1!== undefined && input2 !== undefined){
    ControllerContactGroup.assign(Number(input1),Number(input2))
}
// createTable.contact()
// createTable.group()
// createTable.contactGroup()
// seed.contact()
// seed.group()
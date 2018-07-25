const View = require("./view.js")
const ModelContact = require("./contact.js");
const ViewContact = View.Contact;

const ModelGroup = require("./group.js");

const ViewGroup = View.Group;

const ModelContactGroup = require("./contact-group.js");
const ViewContactGroup = View.ContactGroup;

class Contact{
    static lastId(){
        ModelContact.findLastId()
            .then(data => {
                ViewContact.findLastId(data);
            })
            .catch(err => {
                ViewContact.showError(err)
            })
    }

    static save(jsonFile){
        ModelContact.save(jsonFile)
            .then(data => {
                ViewContact.display(data);
            })
            .catch(err => {
                ViewContact.showDoubleInput(err)
        })
    }

    static create(obj){
        ModelContact.create(obj)
            .then(data =>{
                ViewContact.display(data);
            })
            .catch(err => {
                ViewContact.showDoubleInput(err)
            })
    }

    static update(newValues, whereCondition){
        ModelContact.update(newValues, whereCondition)
            .then(data =>{
                ViewContact.update(data);
            })
            .catch(err =>{
                ViewContact.showError(err)
            })
    }

    static delete(obj){
        ModelContact.delete(obj)
            .then(data =>{
                ViewContact.delete(obj, data);
            })
            .catch(err =>{
                ViewContact.showError(err)
            })
    }

    static show(){
        ModelContact.show()
            .then(data=>{
                ViewContact.show(data);
            })
            .catch(err =>{
                ViewContact.showError(err)
            })
    }
}

class Group{
    static lastId(){
        ModelGroup.findLastId()
            .then(data => {
                ViewGroup.findLastId(data);
            })
            .catch(err => {
                ViewGroup.showError(err)
            })
    }

    static save(jsonFile){
        ModelGroup.save(jsonFile)
            .then(data => {
                ViewGroup.display(data);
            })
            .catch(err => {
                ViewGroup.showDoubleInput(err)
        })
    }

    static create(obj){
        ModelGroup.create(obj)
            .then(data =>{
                ViewGroup.display(data);
            })
            .catch(err => {
                ViewGroup.showDoubleInput(err)
            })
    }

    static update(newValues, whereCondition){
        ModelGroup.update(newValues, whereCondition)
            .then(data =>{
                ViewGroup.update(data);
            })
            .catch(err =>{
                ViewGroup.showError(err)
            })
    }

    static delete(obj){
        ModelGroup.delete(obj)
            .then(data =>{
                ViewGroup.delete(obj, data);
            })
            .catch(err =>{
                ViewGroup.showError(err)
            })
    }

    static show(){
        ModelGroup.show()
            .then(data=>{
                ViewGroup.show(data);
            })
            .catch(err =>{
                ViewGroup.showError(err)
            })
    }
}

class ContactGroup{
    static lastId(){
        ModelContactGroup.findLastId()
            .then(data => {
                ViewContactGroup.findLastId(data);
            })
            .catch(err => {
                ViewContactGroup.showError(err)
            })
    }

    static save(jsonFile){
        ModelContactGroup.save(jsonFile)
            .then(data => {
                ViewContactGroup.display(data);
            })
            .catch(err => {
                ViewContactGroup.showDoubleInput(err)
        })
    }

    static create(obj){
        ModelContactGroup.create(obj)
            .then(data =>{
                ViewContactGroup.display(data);
            })
            .catch(err => {
                ViewContactGroup.showDoubleInput(err)
            })
    }

    static update(newValues, whereCondition){
        ModelContactGroup.update(newValues, whereCondition)
            .then(data =>{
                ViewContactGroup.update(data);
            })
            .catch(err =>{
                ViewContactGroup.showError(err)
            })
    }

    static delete(obj){
        ModelContactGroup.delete(obj)
            .then(data =>{
                ViewContactGroup.delete(obj, data);
            })
            .catch(err =>{
                ViewContactGroup.showError(err)
            })
    }
}

module.exports = {
    Contact : Contact,
    Group : Group,
    ContactGroup : ContactGroup
};

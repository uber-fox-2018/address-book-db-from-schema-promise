const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

class Group {
  constructor(name){
    this.name = name
  }
}

class Model {

  static insert (dataStr, cb){
    return new Promise ((resolve, reject) => {
      let newGroup = new Group (dataStr);
      let keys = (Object.keys(newGroup)).join(', ');
      let totalData;
  
      let qReadAll = `SELECT * FROM 'Groups'`;
      let qInsert = `INSERT INTO 'Groups' (${keys}) VALUES ('${dataStr}')`;
  
      db.serialize(() => {
        db.all(qReadAll, (err, rows) => {
          if (err){
            reject (err);
          } else {
            totalData = rows.length + 1;
          }
        })
  
        db.run (qInsert, (err) => {
          if (err) {
            reject (err);
          } else {
            resolve({message: `${JSON.stringify(newGroup)} saved successfully. Total group : ${totalData}`});
          }
        })
      })
    })
  }

  static update (id, inputArr, cb){
    return new Promise((resolve, reject)=>{
      let arrQuery = []  
      for (let i = 0; i < inputArr.length - 1; i+=2){
        arrQuery.push(`${inputArr[i]} = '${inputArr[i + 1]}'`)
      }
      let setStr = arrQuery.join(', ');
      let qUpdate = `UPDATE 'Groups' SET ${setStr} WHERE id = ${id}`;
      
      db.run(qUpdate, (err) => {
        if (err) {
          reject (err);
        } else {
          resolve({message: `data with id:${id} updated succesfully`});
        }
      });
    })
  }

  static remove (id, cb){
    return new Promise ((resolve, reject)=> {
      let qRemoveGroup = `DELETE FROM 'Groups' WHERE id = ${id}`
      let qRemoveContactGroup = `DELETE FROM ContactGroups WHERE groupId = ${id}`;
      db.serialize(()=> {
        db.run(qRemoveContactGroup, (err) => {
          if (err) {
            reject (err);
          }
        });
  
        db.run(qRemoveGroup, (err) => {
          if (err) {
            reject (err);
          } else {
            resolve ({message: `data with id:${id} deleted succesfully`});
          }
        });
      })
    })
  }
}

module.exports = Model;
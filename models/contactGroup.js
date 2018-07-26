const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

class ContactGroup {
  constructor(inputArr){
    this.contactId = inputArr[0]
    this.groupId = inputArr[1]
  }
}

class Model {
  static insert (dataArr){
    return new Promise ((resolve, reject)=> {
      let dataValues = [];
      dataArr.forEach((data) => {
        dataValues.push(`'${data}'`);
      })
      let dataStr = dataValues.join(', ');
      let newContactGroup = new ContactGroup (dataArr);
      let keys = (Object.keys(newContactGroup)).join(', ');
      let totalData;
  
      let qReadAll = `SELECT * FROM 'ContactGroups'`;
      let qInsert = `INSERT INTO 'ContactGroups' (${keys}) VALUES (${dataStr})`;
  
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
            resolve ({message: `${JSON.stringify(newContactGroup)} saved successfully. Total contact group : ${totalData}`});
          }
        })
      })
    })
  }

  static update (id, inputArr){
    return new Promise ((resolve, reject)=> {
      let arrQuery = []  
      for (let i = 0; i < inputArr.length - 1; i+=2){
        arrQuery.push(`${inputArr[i]} = '${inputArr[i + 1]}'`)
      }
      let setStr = arrQuery.join(', ');
      let qUpdate = `UPDATE 'ContactGroups' SET ${setStr} WHERE id = ${id}`;
      
      db.run(qUpdate, (err) => {
        if (err) {
          reject (err);
        } else {
          resolve ({message: `data with id:${id} updated succesfully`});
        }
      });
    })
  }

  static remove (id){
    return new Promise ((resolve, reject)=> {
      let qRemove = `DELETE FROM 'ContactGroups' WHERE id = ${id}`
      db.run(qRemove, (err) => {
        if (err) {
          reject (err);
        } else {
          resolve ({message: `data with id:${id} deleted succesfully`});
        }
      });
    })
  }
}

module.exports = Model;
const mongo = require('mongodb');
var DBService = require('./DBService');

function getLists(lists) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect()
    .then(db => {
      db.collection('list').find({}).toArray((err, lists) => {
        if (err)  reject(err)
        else      resolve(lists);
        db.close();
      })
    })
  })
}

function getById(listId) {
  listId = new mongo.ObjectID(listId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect()
    .then(db => {
      db.collection('list').findOne({_id: listId}, (err, list) => {
        if (err)    reject(list)
        else        resolve(list)
        db.close();
      }) 
    })
  })
}

function validateDetails(List) {
  console.log(List);
  return List.name !== 'puki';
}

function addList(list) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection('list')
        .findOne({ title: list.title }, (err, listFromDB) => {
          // If name is already used!
          if (listFromDB) {
            console.log('Title is already used!');
            reject('Title is already used!');
            db.close();
          } else {
            db.collection('list').insert(list, (err, res) => {
              if (err) reject(err);
              else resolve(res.ops);
              db.close();
            });
          } 
        });
    });
  });
};

function deleteList(listId) {
  listId = new mongo.ObjectID(listId);
  return new Promise((resolve, reject)=>{
      DBService.dbConnect()
      .then(db=>{
          db.collection('list').deleteOne({_id: listId}, (err, res) => {
              if (err)    reject(err)
              else        resolve();
              db.close();
          });
      })
  });
}

function updateList(list, listId) {
  listId = new mongo.ObjectID(listId);
  return new Promise((resolve, reject)=>{
      DBService.dbConnect()
      .then(db=>{
          db.collection('list').updateOne({_id : listId}, {$set: list}, (err, updatedList) => {
              if (err)    reject(err)
              else        resolve(updatedList);
              db.close();
          });
      })
  });
}

module.exports = {
  getLists,
  getById,
  addList,
  deleteList,
  updateList
}
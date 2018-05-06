const mongo = require("mongodb");
var DBService = require("./DBService");

function getLists(lists) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("list")
        .find({})
        .toArray((err, lists) => {
          if (err) reject(err);
          else resolve(lists);
          db.close();
        });
    });
  });
}

function getById(listId) {
  listId = new mongo.ObjectID(listId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("list").findOne({ _id: listId }, (err, list) => {
        if (err) reject(list);
        else resolve(list);
        db.close();
      });
    });
  });
}

function validateDetails(List) {
  console.log(List);
  return List.name !== "puki";
}

function addList(list) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("list").insert(list, (err, res) => {
        if (err) reject(err);
        else resolve(res.ops);
        db.close();
      });
    });
  });
}

function deleteList(listId) {
  listId = new mongo.ObjectID(listId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("list").deleteOne({ _id: listId }, (err, res) => {
        
        
        if (err) reject(err);
        else 
        {
          resolve(listId);
          socketService.sendUsers(users) //socketService funcs will come here
        }
        db.close();
      });
    });
  });
}

function updateList(list, listId) {
  listId = new mongo.ObjectID(listId);
  delete list._id;
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("list")
        .updateOne({ _id: listId }, list, (err, updatedList) => {
          if (err) reject(err);
          else {
            resolve(updatedList);
            //socketService funcs will come here
          }
          db.close();
        });
    });
  });
}

module.exports = {
  getLists,
  getById,
  addList,
  deleteList,
  updateList
};

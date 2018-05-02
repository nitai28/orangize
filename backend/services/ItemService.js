const mongo = require("mongodb");
var DBService = require("./DBService");

function query() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("item")
        .find()
        .toArray((err, items) => {
          if (err) reject(err);
          else resolve(items);
          db.close();
        });
    });
  });
}

function getById(itemId) {
  itemId = new mongo.ObjectID(itemId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("item")
        .findOne({ _id: itemId }, function(err, item) {
          if (err) reject(err);
          else resolve(item);
          db.close();
        });
    });
  });
}

function add(item) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("item").insertOne(item, (err, res) => {
        db
          .collection("item")
          .findOne(
            { _id: new mongo.ObjectID(res.insertedId) },
            (err, itemFromDB) => {
              if (err) reject(err);
              else resolve(itemFromDB);
              db.close();
            }
          );
      });
    });
  });
}

function remove(itemId) {
  itemId = new mongo.ObjectID(itemId);
  return new Promise((resolve, reject)=>{
      DBService.dbConnect()
      .then(db=>{
          db.collection('item').deleteOne({_id: itemId}, function (err, res) {
              if (err)    reject(err)
              else        resolve();
              db.close();
          });
      })
  });
}

function update(item, itemId) {
  itemId = new mongo.ObjectID(itemId);

  return new Promise((resolve, reject)=>{
      DBService.dbConnect()
      .then(db=>{
          db.collection('item').updateOne({_id : itemId}, { $set: item }, function (err, updatedItem) {
              if (err)    reject(err)
              else        resolve(updatedItem);
              db.close();
          });
      })
  });
}

module.exports = {
  query,
  getById,
  add,
  remove,
  update
};

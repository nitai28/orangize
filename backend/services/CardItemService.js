const mongo = require('mongodb');
var DBService = require('./DBService');

function query() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection('cardItem').find().toArray((err, cardItems) => {
          if (err) reject(err)
          else resolve(cardItems)
          db.close();
        });
    });
  });
}

function add(cardItem) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection('cardItem').insertOne(cardItem, (err, res) => {
        console.log('resresresresresres', res);
        db.collection('cardItem').findOne({_id: new mongo.ObjectID(res.insertedId)}, (err, cardItemFromDB)=>{
          if (err) reject(err)
          else resolve(cardItemFromDB)
          db.close();
        })
      });
    });
  });
}

module.exports = {
  query,
  add
}
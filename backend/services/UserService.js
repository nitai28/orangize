const mongo = require('mongodb');
var DBService = require('./DBService');

function query() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection('user').find().toArray((err, users) => {
          if (err) reject(err)
          else resolve(users)
          db.close();
        });
    });
  });
}

function getById(userId) {

  userId = new mongo.ObjectID(userId);
  return new Promise((resolve, reject)=>{
      DBService.dbConnect()
      .then(db=>{
          db.collection('user').findOne({_id: userId}, function (err, user) {
              if (err)    reject(err)
              else        resolve(user);
              db.close();
          });
      })
  });
}

function deleteUser(userId) {
  userId = new mongo.ObjectID(userId);
  return new Promise((resolve, reject)=>{
      DBService.dbConnect()
      .then(db=>{
          db.collection('user').deleteOne({_id: userId}, function (err, res) {
              if (err)    reject(err)
              else        resolve();
              db.close();
          });
      })
  });
}

function add(user) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection('user').insertOne(user, (err, res) => {
        console.log('resresresresresres', res);
        db.collection('user').findOne({_id: new mongo.ObjectID(res.insertedId)}, (err, userFromDB)=>{
          if (err) reject(err)
          else resolve(userFromDB)
          db.close();
        })
      });
    });
  });
}

function updateUser(user) {
  user._id = new mongo.ObjectID(user._id);
  return new Promise((resolve, reject)=>{
      DBService.dbConnect()
      .then(db=>{
          db.collection('user').updateOne({_id : user._id}, {$set:user}, function (err, updatedUser) {
              if (err)    reject(err)
              else        resolve(updatedUser);
              db.close();
          });
      })
  });
}
function checkLogin(user){
  return new Promise((resolve, reject)=>{
    DBService.dbConnect()
    .then(db=>{
        db.collection('user').findOne({name:user.name, password:user.password}, function (err, user) {
            if (err || !user)    reject(err)
            else        resolve(user);
            db.close();
        });
    })
});

}


module.exports = {
  query,
  add,
  getById,
  updateUser,
  deleteUser,
  checkLogin
}
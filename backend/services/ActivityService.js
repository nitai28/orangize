const mongo = require("mongodb");
var DBService = require("./DBService");

function query() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("activity")
        .find({})
        .toArray((err, activities) => {
          if (err) reject(err);
          else resolve(activities);
          db.close();
        });
    });
  });
}

function addActivity(activity) {
    return new Promise((resolve, reject) => {
      DBService.dbConnect().then(db => {
        db.collection("activity").insert(activity, (err, res) => {
          if (err) reject(err);
          else {
            console.log('res-ops',res.ops)
            resolve(res.ops)};
          db.close();
        });
      });
    });
}

module.exports = {
  addActivity,
  query
};

const mongo = require("mongodb");
var DBService = require("./DBService");

function updateBoard(lists) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("list").drop((err, res) => {
        if (err) reject(err);
        else {
          lists.forEach(list => list._id = new mongo.ObjectID(list._id));
          db.collection("list").insertMany(lists, (err, res) => {
            if (err) reject(err);
            else resolve(res);
            db.close();
          });
        }
      });
    });
  });
}

module.exports = {
  updateBoard
};

const mongo = require("mongodb");
var DBService = require("./DBService");

function updateBoard(lists) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("test").drop((err, res) => {
        if (err) reject(err);
        else {
          db.collection("test").insertMany(lists, (err, res) => {
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

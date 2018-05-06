const mongo = require("mongodb");
var DBService = require("./DBService");

function updateBoard(cards) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("card").drop((err, res) => {
        if (err) reject(err);
        else {
          cards.forEach(card => card._id = new mongo.ObjectID(card._id));
          db.collection("card").insertMany(cards, (err, res) => {
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

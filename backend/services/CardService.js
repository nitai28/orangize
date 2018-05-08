const mongo = require("mongodb");
var DBService = require("./DBService");

function getCards(cards) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("card")
        .find({})
        .toArray((err, cards) => {
          if (err) reject(err);
          else resolve(cards);
          db.close();
        });
    });
  });
}

function getById(cardId) {
  cardId = new mongo.ObjectID(cardId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("card").findOne({ _id: cardId }, (err, card) => {
        if (err) reject(card);
        else resolve(card);
        db.close();
      });
    });
  });
}

function validateDetails(Card) {
  console.log(Card);
  return Card.name !== "puki";
}

function addCard(card) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("card").insert(card, (err, res) => {
        if (err) reject(err);
        else {
          console.log('res-ops',res.ops)
          resolve(res.ops)};
        db.close();
      });
    });
  });
}

function deleteCard(cardId) {
  cardId = new mongo.ObjectID(cardId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("card").deleteOne({ _id: cardId }, (err, res) => {
        if (err) reject(err);
        else {
          resolve(cardId)
          // socketService.sendUsers(users) //socketService funcs will come here
        };
        db.close();
      });
    });
  });
}

function updateCard(card, cardId) {
  cardId = new mongo.ObjectID(cardId);
  delete card._id;
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("card")
        .updateOne({ _id: cardId }, card, (err, updatedCard) => {
          if (err) reject(err);
          else {
          resolve(updatedCard);
          //socketService funcs will come here
        }
          db.close();
        });
    });
  });
}

module.exports = {
  getCards,
  getById,
  addCard,
  deleteCard,
  updateCard
};

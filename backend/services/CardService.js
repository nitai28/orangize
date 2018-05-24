const mongo = require("mongodb");
var DBService = require("./DBService");

function getCards() {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db
        .collection("card")
        .find({})
        .sort({pos: 1})
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
  return Card.name !== "puki";
}

function addCard(card) {
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection('card').update({}, {$inc: {pos: 1}}, {multi: true}, (err, res) => {
        if(err) reject(err);
      })
        db.collection("card").insert(card, (err, res) => {
          if (err) reject(err);
          else {
            resolve(res.ops);
          }
        });
        db.close();
      });
  });
}

function deleteCard(cardId) {
  cardId = new mongo.ObjectID(cardId);
  return new Promise((resolve, reject) => {
    DBService.dbConnect().then(db => {
      db.collection("card").findOne({ _id: cardId }, (err, card) => {
        if (err) reject(err);
        else if(card) {
          db.collection('card').update({pos: {$gt: card.pos}}, {$inc: {pos: -1}}, {multi: true}, (err, res) => {
            if(err) reject(err);
          })
        }
      });
      db.collection("card").deleteOne({ _id: cardId }, (err, res) => {
        if (err) reject(err);
        else {
          resolve(cardId);
          // socketService.sendUsers(users) //socketService funcs will come here
        }
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
      // MADE A console.log to cards here - BEFORE.
      db.collection("card").updateOne({ _id: cardId }, card, (err, updatedCard) => {
        // And here - AFTER.
        if (err) reject(err);
          else     resolve(updatedCard);
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

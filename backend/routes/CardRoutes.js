var CardService = require("../services/CardService");

module.exports = app => {
  // app.get('/Card', isLoggedIn, (req, res) => {
  app.get("/card", (req, res) => {
    // CardService.query(req.session.user._id).then(Cards => {
    CardService.getCards().then(Cards => {
      res.json(Cards);
    });
  });

  // app.get('/Card/id', isLoggedIn, (req, res) => {
  app.get("/card/:cardId", (req, res) => {
    const cardId = req.params.cardId;
    // CardService.query(req.session.user._id).then(Cards => {
    CardService.getById(cardId).then(card => {
      res.json(card);
    });
  });

  // app.post('/Card', isLoggedIn, (req, res) => {
  app.post("/card", (req, res) => {
    const Card = req.body;
    // Card.userId = req.session.user._id;
    CardService.addCard(Card).then(addedCard => {
      res.json(addedCard);
    });
  });

  // app.post('/Card/id', isLoggedIn, (req, res) => {
  app.delete(`/card/:cardId`, (req, res) => {
    const cardId = req.params.cardId;
    if (!cardId) {
      res.status(500).send("Missing CardID to delete");
    }
    CardService.deleteCard(cardId)
      .then(_ => res.end())
      .catch(err => res.status(500).send("Could not delete card"));
  });

  // app.post('/Card/id', isLoggedIn, (req, res) => {
  app.put(`/card/:cardId`, (req, res) => {
    const cardId = req.params.cardId;
    const card = req.body;
    // Card.userId = req.session.user._id;
    CardService.updateCard(card, cardId)
      .then(card => res.json(card))
      .catch(err => res.status(500).send(err));
  });
};

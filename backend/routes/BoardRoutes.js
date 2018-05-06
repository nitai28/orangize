var BoardService = require("../services/BoardService");

module.exports = app => {
  app.put(`/board`, (req, res) => {
    const newCards = req.body;
    BoardService.updateBoard(newCards)
      .then(response => res.json(response.ops))
      .catch(err => res.status(500).send(err));
  });    
}

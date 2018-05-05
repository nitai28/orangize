var BoardService = require("../services/BoardService");

module.exports = app => {
  app.put(`/board`, (req, res) => {
    const newLists = req.body;
    BoardService.updateBoard(newLists)
      .then(response => res.json(response.ops))
      .catch(err => res.status(500).send(err));
  });    
}

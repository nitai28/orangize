var ListService = require("../services/ListService");
// var SocketService = require('../services/SocketService');

module.exports = app => {
  // app.get('/List', isLoggedIn, (req, res) => {
  app.get("/list", (req, res) => {
    // ListService.query(req.session.user._id).then(Lists => {
    ListService.getLists().then(Lists => {
      res.json(Lists);
    });
  });

  // app.get('/List/id', isLoggedIn, (req, res) => {
  app.get("/list/:listId", (req, res) => {
    const listId = req.params.listId;
    // ListService.query(req.session.user._id).then(Lists => {
    ListService.getById(listId).then(list => {
      res.json(list);
    });
  });

  // app.post('/List', isLoggedIn, (req, res) => {
  app.post("/list", (req, res) => {
    const List = req.body;
    // List.userId = req.session.user._id;
    ListService.addList(List).then(addedList => {
      res.json(addedList);
    });
  });

  // app.post('/List/id', isLoggedIn, (req, res) => {
  app.delete(`/list/:listId`, (req, res) => {
    const listId = req.params.listId;
    if (!listId) {
      res.status(500).send("Missing ListID to delete");
    }
    ListService.deleteList(listId)
      .then(_ => res.end())
      .catch(err => res.status(500).send("Could not delete list"));
  });

  // app.post('/List/id', isLoggedIn, (req, res) => {
  app.put(`/list/:listId`, (req, res) => {
    const listId = req.params.listId;
    const list = req.body;
    // List.userId = req.session.user._id;
    ListService.updateList(list, listId)
      .then(list => res.json(list))
      .catch(err => res.status(500).send(err));
  });
};

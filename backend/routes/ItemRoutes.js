var ItemService = require("../services/ItemService");

module.exports = app => {
  // app.get('/item', isLoggedIn, (req, res) => {
  app.get("/item", (req, res) => {
    // ItemService.query(req.session.user._id).then(items => {
    ItemService.query().then(items => {
      console.log("ITEMS: ", items);
      res.json(items);
    });
  });

  app.get(`/item/:itemId`, (req, res) => {
    const itemId = req.params.itemId;
    console.log(itemId);
    ItemService.getById(itemId)
      .then(item => {
        res.json(item);
      })
      .catch(err => res.status(500).send(err.message));
  });

  // app.post('/item', isLoggedIn, (req, res) => {
  app.post("/item", (req, res) => {
    const item = req.body;
    // item.userId = req.session.user._id;
    ItemService.add(item).then(addedItem => {
      res.json(addedItem);
    });
  });

  app.delete(`/item/:itemId`, (req, res) => {
    const itemId = req.params.itemId;
    if (!itemId) {
      res.status(500).send("Missing ItemID to delete");
    }
    ItemService.remove(itemId)
      .then(_ => res.json(`item has been deleted successfully.`))
      .catch(err => res.status(500).send("Could not delete item"));
  });

  app.put(`/item/:itemId`, (req, res) => {
    const itemId = req.params.itemId;
    const item = req.body;
    ItemService.update(item, itemId)
      .then(item => res.json(item))
      .catch(err => res.status(500).send("Could not update item"));
  });
};

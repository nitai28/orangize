var CardItemService = require('../services/CardItemService')

module.exports = app => {
  // app.get('/cardItem', isLoggedIn, (req, res) => {
  app.get('/cardItem', (req, res) => {
    // CardItemService.query(req.session.user._id).then(cardItems => {
    CardItemService.query().then(cardItems => {
      console.log('CARDITEMS: ', cardItems);
      res.json(cardItems)
    })

  });
  // app.post('/cardItem', isLoggedIn, (req, res) => {
  app.post('/cardItem', (req, res) => {
    const cardItem = req.body;
    // cardItem.userId = req.session.user._id; 
    CardItemService.add(cardItem).then(addedCardItem => {
      res.json(addedCardItem)
    })
  });

}
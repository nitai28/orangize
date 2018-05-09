var UserService = require("../services/UserService");

module.exports = app => {
  // app.get('/user', isLoggedIn, (req, res) => {
  app.get("/user", (req, res) => {
    // UserService.query(req.session.user._id).then(user => {
    UserService.query().then(user => {
      console.log("USER: ", user);
      res.json(user);
    });
  });
  // app.post('/user', isLoggedIn, (req, res) => {
  app.post("/user", (req, res) => {
    const user = req.body;
    // user.userId = req.session.user._id;
    UserService.add(user).then(addedUser => {
      res.json(addedUser);
    });
  });

  app.delete(`/user/:userId`, (req, res) => {
    console.log("delete");

    const userId = req.params.userId;
    if (!userId) {
      res.status(500).send("Missing userID to delete");
    }
    UserService.deleteUser(userId)
      .then(_ => res.end())
      .catch(err => res.status(500).send("Could not delete user"));
  });
  
  app.get('/user/logout', (req, res) => {
    console.log('asdasdasdasdasddad');
    // req.session.reset();
    res.end('Loggedout');
  });
  
  app.get(`/user/:userId`, (req, res) => {
    const userId = req.params.userId;
    UserService.getById(userId)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(500).send(err.message));
  });
  

  app.put(`/user/:userId`, (req, res) => {
    const userId = req.params.userId;
    const user = req.body;
    UserService.updateUser(user)
      .then(user => res.json(user))
      .catch(err => res.status(500).send("Could not update user"));
  });
  app.post("/user/login", function(req, res) {
    // console.log(req.body);
    
    var user = { name: req.body.name, password: req.body.password };
      UserService.checkLogin(user).then(userFromDB=>  res.json(userFromDB))
      .catch(err => res.status(500).send("Could not login "));
   
  });

  
};

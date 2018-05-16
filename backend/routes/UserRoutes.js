var UserService = require("../services/UserService");

module.exports = app => {
  // app.get('/user', isLoggedIn, (req, res) => {
  app.get("/user", (req, res) => {
    // UserService.query(req.session.user._id).then(user => {
    UserService.query().then(user => {
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

    const userId = req.params.userId;
    if (!userId) {
      res.status(500).send("Missing userID to delete");
    }
    UserService.deleteUser(userId)
      .then(_ => res.end())
      .catch(err => res.status(500).send("Could not delete user"));
  });
  
  app.get('/user/logout', (req, res) => {
    // req[session].reset()
    req.session.reset();
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
  app.post('/user/loggedIn', (req, res) => {
    if(req.session.user) res.json(req.session.user)
    // console.log(req.session);
    // res.json(req.session.user);
  })

  app.post("/user/login", (req, res) => {
    console.log(req.session.user)
      var user = { name: req.body.name, password: req.body.password };
      UserService.checkLogin(user).then(userFromDB => {
        delete userFromDB.password;
        req.session.user = userFromDB;
        res.json(userFromDB);
      })
      
      .catch(err => {
        req.session.user = null;
        res.status(500).send("Could not login ")
      });
  });

  app.post('/login', (req, res) => {

    const user = req.body;
    UserService.checkLogin(user).then(userFromDB => {
      if (userFromDB) {
        delete userFromDB.password;
        req.session.user = userFromDB;

        res.json(userFromDB);
      } else {
        req.session.user = null;
        res.status(403).send({ error: 'Login failed!' });
      }
    });
  });

  
};

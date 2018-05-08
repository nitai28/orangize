var express = require('express');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')

var corsOptions = {
  origin: /http:\/\/127.0.0.1:\d+/,
	credentials: true
};

app.use(cors(corsOptions))

const clientSessions = require('client-sessions');

var UserService = require('./services/UserService')
// var SocketService = require('./services/SocketService')
var CardService = require('./services/CardService')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.static('front'));

app.use(clientSessions({
  cookieName: 'session',
  secret: 'C0d1ng 1s fun 1f y0u kn0w h0w', // set this to a long random string!
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000  
}));

global.isLoggedIn = (req, res, next) => {
  if (!req.session || !req.session.user) {
    res.end('Not allowed');
  } else {
    next();
  }
}

const addUserRoutes = require('./routes/UserRoutes.js')
addUserRoutes(app)
const addCardRoutes = require('./routes/CardRoutes.js')
addCardRoutes(app)
const addBoardRoutes = require('./routes/BoardRoutes.js')
addBoardRoutes(app)
const addActivityRoutes = require('./routes/BoardRoutes.js')
addBoardRoutes(app)


http.listen(3000, () => {
  console.log('listening on *:3000');
});



var nums = []

io.on('connection', (socket) => {
  // socket.on('user connected', (num) => {
  //   nums.push(num);
  //   io.emit('users changed', nums);
  // }),
  socket.on('task removed', (card) => {
    console.log('a task as removed from the card:', card);
    io.emit('task removed', card)
  }),
  socket.on('card removed', (cardId) => {
    io.emit('card removed', cardId)
  }),
  socket.on('task added', (task) => {
    io.emit('task added', task)
  }),
  socket.on('card added', (card) => {
    io.emit('card added', card)
  })


  // socket.on('disconnect', function(){
  //   if(!users) return;
  //   removeUser(user.id);
  //   socket.broadcast.emit('chat msg', {txt: `${user.nickName} has been disconnected!`, processed: false, from: 'SERVER'});
  //   io.emit('users changed', users);
  // });
  // socket.on('chat msg', function(msg){
  //   socket.broadcast.emit('chat msg', msg);
  //   console.log('msg: ' + msg);
  // });
  // socket.on('user typing', function(typingUser, isTyping) {
  //   console.log('isTyping:', isTyping);
  //   setTypingUser(typingUser.id, isTyping);
  //   io.emit('users changed', users);
  // }),
  // socket.on('open private chat', function(userId1, userId2) {
    
  // })
});


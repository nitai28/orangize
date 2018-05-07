// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var bodyParser = require('body-parser')

// var nums = []

// io.on('connection', (socket) => {
//   socket.on('user connected', (num) => {
//     nums.push(num);
//     io.emit('users changed', nums);
//   })
//   socket.on('test', () => {
//     io.emit('test')
//   }),
//   socket.on('task removed', (card) => {
//     console.log('a task as removed from the card:', card)
//   })
//   // socket.on('disconnect', function(){
//   //   if(!users) return;
//   //   removeUser(user.id);
//   //   socket.broadcast.emit('chat msg', {txt: `${user.nickName} has been disconnected!`, processed: false, from: 'SERVER'});
//   //   io.emit('users changed', users);
//   // });
//   // socket.on('chat msg', function(msg){
//   //   socket.broadcast.emit('chat msg', msg);
//   //   console.log('msg: ' + msg);
//   // });
//   // socket.on('user typing', function(typingUser, isTyping) {
//   //   console.log('isTyping:', isTyping);
//   //   setTypingUser(typingUser.id, isTyping);
//   //   io.emit('users changed', users);
//   // }),
//   // socket.on('open private chat', function(userId1, userId2) {
    
//   // })
// });

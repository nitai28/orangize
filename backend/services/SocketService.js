var nums = []

io.on('connection', function(socket){
  socket.on('user connected', function(num) {
    nums.push(num);
    io.emit('users changed', nums);
  })
  socket.on('test', function(){
    io.emit('test')
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

import ioClient from 'socket.io-client'

// import busService from './bus.service';

var socket = null;

function connectSocket() {
    socket = ioClient('http://localhost:3000');
    socket.emit('user connected', 5);
    socket.on('users changed', function(nums) {
        console.log('USERS CHANGED!', nums)
        // users = serverUsers;
        // busService.$emit('users changed', users);
        
    });
    socket.on('chat msg', function (msg) {
        // JIF
        // if (user.nickName === msg.from) msgs[msgs.length - 1].processed = true;
        // else msgs.push(msg);
    });
}

// const send = (msg) => {
//     msgs.push(msg);
//     socket.emit('chat msg', msg);
// }

// const emitTyping = (user, isTyping) => {
//     socket.emit('user typing', user, isTyping)
// }

// function createEmptyMsg() {
//     return { txt: '', processed: false, from: user, room: null };
// }
// function openPrivateChat(userId1, userId2) {
//     socket.emit('open private chat', userId1, userId2);
// }

export default {
    // getMsgs,
    // send,
    // user,
    // users,
    // createEmptyMsg,
    connectSocket
    // emitTyping,
    // openPrivateChat
    
}



function lorem(size = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

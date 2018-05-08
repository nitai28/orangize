import ioClient from 'socket.io-client'

import busService from './EventBusService';

var socket = null;

function connectSocket() {
    socket = ioClient('http://localhost:3000');
    
    socket.on('task removed', (card) => {
        busService.$emit('task removed', card); 
    });

    socket.on('task added', (task) => {
        busService.$emit('task added', task);
    })

    socket.on('card removed', (cardId) => {
        busService.$emit('card removed', cardId); 
    });

    socket.on('card added', (card) => {
        busService.$emit('card added', card);
    });

    socket.on('card updated', (card) => {
        busService.$emit('card updated', card);
    });

    socket.on('cards order updated',(cards) => {
        busService.$emit('cards order updated', cards);
    });
    
    socket.on('task moved',(card) => {
        busService.$emit('task moved', card);
    });
    socket.on('chat msg', function (msg) {
        // JIF
        // if (user.nickName === msg.from) msgs[msgs.length - 1].processed = true;
        // else msgs.push(msg);
    });
}

const removeTask = (card) => {
    // console.log('task removed from', card)
    socket.emit('task removed', card);
}

const removeCard = (cardId) => {
    socket.emit('card removed', cardId);
}

const addTask = (task) => {
    socket.emit('task added', task);
}

const addCard = (card) => {
    socket.emit('card added', card);
}

const updateCard = (card) => {
    socket.emit('card updated', card);
}

const updateAllCards = (cards) => {
    socket.emit('cards order updated', cards)
}

const moveTask = (card) => {
    socket.emit('task moved', card)
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
    connectSocket,
    removeTask,
    addTask,
    removeCard,
    addCard,
    updateCard,
    updateAllCards
    // getMsgs,
    // send,
    // user,
    // users,
    // createEmptyMsg,
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

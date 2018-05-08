import shortid from 'shortid';
var debounce = require("debounce");

function _emptyActivity() {
    return {
        action: '',
        txt: '',
        at: Dath.Now(),
        by: {
            name: ''
        },
        taskId: ''
    }
}

function addTask(task) {
    return new Promise((resolve, reject) => {
        let activity = {
            _id: shortid.generate(),
            action: 'Add Task',
            txt: 'A new task has been added by Itay.',
            at: Date.now(),
            // TODO: Insert user object into 'by'
            by: {
                name: '#NAME#'
            },
            taskId: task._id
        }
        resolve(activity);
    })
}

function removeTask(task) {
    return new Promise((resolve, reject) => {
        let activity = {
            _id: shortid.generate(),
            action: 'Remove Task',
            txt: `${task.title} has been removed by Itay.`,
            at: Date.now(),
            by: {
                name: '#NAME#'
            },
            taskId: task._id
        }
        resolve(activity);
    })
}

function updateTask(task) {
    return new Promise((resolve, reject) => {
        let activity = {
            _id: shortid.generate(),
            action: 'Update Task',
            txt: `${task.title} has been updated by Itay.`,
            at: Date.now(),
            by: {
                name: '#NAME#'
            },
            taskId: task._id
        }
        resolve(activity);
    })
}
// TODO: Add debounce!
function moveTask() {
    // debounce(function () {
        return new Promise((resolve, reject) => {
            let activity = {
                _id: shortid.generate(),
                action: 'Move Task',
                txt: `Task order has been changed by Itay.`,
                at: Date.now(),
                by: {
                    name: '#NAME#'
                },
            }
            resolve(activity);
        })
    // }, 200)
}

function addCard(card) {
    return new Promise((resolve, reject) => {
        let activity = {
            _id: shortid.generate(),
            action: 'Add Card',
            txt: 'A new card has been added by Itay.',
            at: Date.now(),
            // TODO: Insert user object into 'by'
            by: {
                name: '#NAME#'
            },
            cardId: card._id
        }
        resolve(activity);
    })
}

function removeCard(card) {
    return new Promise((resolve, reject) => {
        let activity = {
            _id: shortid.generate(),
            action: 'Remove Card',
            txt: `A card '${card.title}' has been removed by Itay.`,
            at: Date.now(),
            // TODO: Insert user object into 'by'
            by: {
                name: '#NAME#'
            },
            cardId: card._id
        }
        resolve(activity);
    })
}
// TODO: Add debounce!
function updateCard(card) {
    return new Promise((resolve, reject) => {
        let activity = {
            _id: shortid.generate(),
            action: 'Update Card',
            txt: `A card '${card.title}' has been updated by Itay.`,
            at: Date.now(),
            // TODO: Insert user object into 'by'
            by: {
                name: '#NAME#'
            },
            cardId: card._id
        }
        resolve(activity);
    })
}
// function addTask(card) {
//   return axios.put(_getCardUrl(card._id), card).then(_ =>{
//     let addedTask = card.tasks[card.tasks.length - 1];
//     SocketService.addTask(addedTask);
// })
export default {
    addTask,
    removeTask,
    updateTask,
    moveTask,
    addCard,
    removeCard,
    updateCard
}
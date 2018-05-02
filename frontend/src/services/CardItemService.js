/* eslint-disable */

import storageService from './storage.service.js'
// import eventBus, { USR_MSG_DISPLAY } from './event-bus.service.js'

const KEY = 'todoAppKey';
const USER_KEY = 'userKey';

// When app is loaded - init our initial storage
(() => {
    {
        if (!localStorage[KEY]) {
            localStorage[KEY] = JSON.stringify([{
                id: 1,
                text: 'To complete my homework.',
                isDone: true
            },
            {
                id: 2,
                text: 'Walk with my dog.',
                isDone: false
            },
            {
                id: 3,
                text: 'PLAY Catan',
                isDone: true
            },
            {
                id: 4,
                text: 'To complete my homework.',
                isDone: false
            },
            ])
        }
        if (!localStorage[USER_KEY]) {
            localStorage[USER_KEY] = JSON.stringify({
              userName: "ItayBS",
              actions: [
                {
                  name: "addTodo",
                  at: new Date(2018, 2, 10)
                },
                {
                  name: "updateTodo",
                  at: new Date(2018, 1, 24)
                },
                {
                    name: 'addTodo',
                    at: new Date(2018, 3, 5)
                },
              ]
            });
        }
    }
})();

function query(filter = null) {
    return storageService.load(KEY)
        .then(todos => {
            console.log('Todos: ', todos);
            console.log(filter);
            if (filter === null) return todos;
            else {
                if (filter.bySearch) {
                    todos = todos.filter(todo => todo.text.toLowerCase().includes(filter.bySearch.toLowerCase()));
                }
                if (filter.byStatus === 'Active')
                    return todos.filter(todo => todo.isDone === false);
                else if (filter.byStatus === 'Done')
                    return todos.filter(todo => todo.isDone === true);
                else return todos;
            }
        })
}

function getEmptyTodo() {
    return { id: '', text: '', isDone: '', createdAt: null };
}

// function getById(id) {
//     return storageService.load(KEY)
//         .then(todos => {
//             return todos.find(todo => todo.id === id);
//         })
// }

function deleteTodo(todoId) {
    return storageService.load(KEY)
        .then(todos => {
            var todoIdx = todos.findIndex(todo => todo.id === todoId);
            todos.splice(todoIdx, 1);
            return storageService.store(KEY, todos);
        })
}

function saveTodo(todo) {
    return new Promise((resolve, reject) => {
        storageService.load(KEY)
            .then(todos => {
                if (todo.id) {
                    var todoIdx = todos.findIndex(currTodo => currTodo.id === todo.id)
                    todos.splice(todoIdx, 1, todo);
                } else {
                    todo.id = Date.now();
                    todos.unshift(todo);
                }
                storageService.store(KEY, todos);
                resolve(todo);
            });
    })
}

function toggleIsDone(id) {
    return storageService.load(KEY)
    .then(todos => {
        let todoIdx = todos.findIndex(todo => todo.id === id);
        if(todoIdx === -1) return false;
        console.log(todos[todoIdx].isDone);
        todos[todoIdx].isDone = !todos[todoIdx].isDone;
        storageService.store(KEY, todos);
        return todos[todoIdx].isDone;
    })
}

function queryUserData() {
    return storageService.load(USER_KEY)
        .then(userData => {
            console.log('Query User Data done.')
            return userData;
        })
}

function updateUserAction(name) {
    return storageService.load(USER_KEY)
            .then(userData => {
                userData.actions = [{ name, at: new Date() }, ...userData.actions];
                console.log('USER:', userData.userName);
                console.log('Actions:', userData.actions);
                storageService.store(USER_KEY, userData);
                return userData;
            })
}

function updateUserName(name) {
    return storageService.load(USER_KEY)
            .then(userData => {
                userData.userName = name
                storageService.store(USER_KEY, userData);
                return userData;
            })
}

export default {
    query,
    // getById,
    deleteTodo,
    saveTodo,
    toggleIsDone,
    getEmptyTodo,
    queryUserData,
    updateUserAction,
    updateUserName
}
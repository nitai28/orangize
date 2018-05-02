import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import UserStore from './UserStore.js'

export default new Vuex.Store({
  strict: true,
  state: {},
  modules: {
    UserStore
  }
  
})


// import todosService from '../services/todos.service.js';


// export default new Vuex.Store({
//   strict: true,
//   state: {
//     todosFilter: {
//       byStatus: 'All',
//       bySearch: ''
//     },
//     todos: [
//     ],

//     user: {
//       userName: '',
//       actions: [{
//         name: '',
//         at: 0
//       }]
//     },
//   },
//   mutations: {
//     setTodos(state, { todos }) {
//       console.log('STORE: Todos has been loaded.');
//       state.todos = todos;
//     },
//     addTodo(state, { todo }) {
//       state.todos = [todo, ...state.todos];
//     },
//     updateTodo(state, { todo }) {
//       const todoIdx = state.todos.findIndex(currTodo => currTodo.id === todo.id)
//       state.todos.splice(todoIdx, 1, todo)
//     },
//     deleteTodo(state, { id }) {
//       let todoIdx = state.todos.findIndex(todo => todo.id === id);
//       if (todoIdx > -1)
//         state.todos.splice(todoIdx, 1);
//     },
//     toggleIsDone(state, { id }) {
//       let todoIdx = state.todos.findIndex(todo => todo.id === id);
//       if (todoIdx > -1) state.todos[todoIdx].isDone = !state.todos[todoIdx].isDone;
//     },
//     setFilterByStatus(state, { status }) {
//       state.todosFilter.byStatus = status;
//       console.log(state.todosFilter);
//     },
//     setFilterBySearch(state, { todoName }) {
//       state.todosFilter.bySearch = todoName;
//       console.log(state.todosFilter);
//     },
//     setUserName(state, { userName }) {
//       state.user.userName = userName;
//     },
//     setUserData(state, { userData }) {
//       state.user = userData;
//     }
//   },
//   getters: {
//     getTodos(state) {
//       return state.todos;
//     },
//     getActiveTodosLength(state) {
//       let activeTodos = state.todos.filter(todo => todo.isDone === false);
//       if (activeTodos.length === 0) return 'AWESOME, you made it!';
//       return activeTodos.length;
//     },
//     getUserData(state) {
//       return state.user;
//     }
//   },
//   actions: {
//     loadTodos(store) {
//       console.log('STORE: Loading todos.')
//       return todosService.query(store.state.todosFilter)
//         .then(todos => { store.commit({ type: 'setTodos', todos }) })
//     },
//     loadUserData(store) {
//       console.log('STORE: Loading user actions.');
//       return todosService.queryUserData()
//         .then(userData => store.commit({ type: 'setUserData', userData}))
//     },
//     saveTodo(store, { todo }) {
//       const isEdit = !!todo.id
//       todosService.saveTodo(todo)
//         .then(todo => {
//           if (isEdit) {
//             store.commit({ type: 'updateTodo', todo });
//             store.dispatch({ type: 'updateUserAction', actionName: 'updateTodo'});
//           } 
//           else {
//             store.commit({ type: 'addTodo', todo });
//             store.dispatch({ type: 'updateUserAction', actionName: 'addTodo'});
//           }
//         })
//     },
//     deleteTodo(store, { id }) {
//       todosService.deleteTodo(id)
//         .then(() => {
//           store.commit({ type: 'deleteTodo', id })
//         })
//       store.dispatch({ type: 'updateUserAction', actionName: 'deleteTodo'});
//     },
//     toggleIsDone(store, { id }) {
//       todosService.toggleIsDone(id)
//         .catch(() => { // IF ERROR TURN IT BACK!
//           store.commit({ type: 'toggleIsDone', id })
//         })
//       store.commit({ type: 'toggleIsDone', id })
//     },
//     updateUserAction(store, { actionName }) {
//       todosService.updateUserAction(actionName)
//         .then(() => {
//           console.log('UPDATED USER ACTION.', actionName);
//         })
//     },
//     saveUserName(store, { userName }) {
//       todosService.updateUserName(userName)
//         .then(() => {
//           store.commit({ type: "setUserName", userName: userName });
//         })
//       }
//   }
// })
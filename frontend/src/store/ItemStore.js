import ItemService from "../services/ItemService.js";
import ListService from "../services/ListService.js";

export default {
  strict: true,
  state: {
    // todosFilter: {
    //   byStatus: 'All',
    //   bySearch: ''
    // },
    items: [],
    itemToShow: null,
    // user: {
    //   userName: '',
    //   actions: [{
    //     name: '',
    //     at: 0
    //   }]
    // },
  },
  mutations: {
    setLists(state, { items }) {
      console.log("STORE: Items has been loaded.");
      state.items = items;
    }
    // addTodo(state, { todo }) {
    //   state.todos = [todo, ...state.todos];
    // },
    // updateTodo(state, { todo }) {
    //   const todoIdx = state.todos.findIndex(currTodo => currTodo.id === todo.id)
    //   state.todos.splice(todoIdx, 1, todo)
    // },
    // deleteTodo(state, { id }) {
    //   let todoIdx = state.todos.findIndex(todo => todo.id === id);
    //   if (todoIdx > -1)
    //     state.todos.splice(todoIdx, 1);
    // },
    // toggleIsDone(state, { id }) {
    //   let todoIdx = state.todos.findIndex(todo => todo.id === id);
    //   if (todoIdx > -1) state.todos[todoIdx].isDone = !state.todos[todoIdx].isDone;
    // },
    // setFilterByStatus(state, { status }) {
    //   state.todosFilter.byStatus = status;
    //   console.log(state.todosFilter);
    // },
    // setFilterBySearch(state, { todoName }) {
    //   state.todosFilter.bySearch = todoName;
    //   console.log(state.todosFilter);
    // },
    // setUserName(state, { userName }) {
    //   state.user.userName = userName;
    // },
    // setUserData(state, { userData }) {
    //   state.user = userData;
    // }
  },
  getters: {
    getLists(state) {
      return state.items;
    }
    // getActiveTodosLength(state) {
    //   let activeTodos = state.todos.filter(todo => todo.isDone === false);
    //   if (activeTodos.length === 0) return 'AWESOME, you made it!';
    //   return activeTodos.length;
    // },
    // getUserData(state) {
    //   return state.user;
    // }
  },
  actions: {
    loadLists(store) {
      console.log("STORE: Loading items.");
      // store.state.ItemFilter
      return ItemService.query().then(items => {
        store.commit({ type: "setItems", items });
      });
    },
    // createItem(store, {list}) {
    //   console.log(list)
    //   list.items.push(ItemService.emptyItem());
    //   ListService.saveList(list)
    // }

    // saveTodo(store, { todo }) {
    //         const isEdit = !!todo.id
    //         todosService.saveTodo(todo)
    //           .then(todo => {
    //             if (isEdit) {
    //               store.commit({ type: 'updateTodo', todo });
    //               store.dispatch({ type: 'updateUserAction', actionName: 'updateTodo'});
    //             } 
    //             else {
    //               store.commit({ type: 'addTodo', todo });
    //               store.dispatch({ type: 'updateUserAction', actionName: 'addTodo'});
    //             }
    //           })
    //       },

    // loadUserData(store) {
    //   console.log('STORE: Loading user actions.');
    //   return todosService.queryUserData()
    //     .then(userData => store.commit({ type: 'setUserData', userData}))
    // },
    // saveTodo(store, { todo }) {
    //   const isEdit = !!todo.id
    //   todosService.saveTodo(todo)
    //     .then(todo => {
    //       if (isEdit) {
    //         store.commit({ type: 'updateTodo', todo });
    //         store.dispatch({ type: 'updateUserAction', actionName: 'updateTodo'});
    //       }
    //       else {
    //         store.commit({ type: 'addTodo', todo });
    //         store.dispatch({ type: 'updateUserAction', actionName: 'addTodo'});
    //       }
    //     })
    // },
    // deleteTodo(store, { id }) {
    //   todosService.deleteTodo(id)
    //     .then(() => {
    //       store.commit({ type: 'deleteTodo', id })
    //     })
    //   store.dispatch({ type: 'updateUserAction', actionName: 'deleteTodo'});
    // },
    // toggleIsDone(store, { id }) {
    //   todosService.toggleIsDone(id)
    //     .catch(() => { // IF ERROR TURN IT BACK!
    //       store.commit({ type: 'toggleIsDone', id })
    //     })
    //   store.commit({ type: 'toggleIsDone', id })
    // },
    // updateUserAction(store, { actionName }) {
    //   todosService.updateUserAction(actionName)
    //     .then(() => {
    //       console.log('UPDATED USER ACTION.', actionName);
    //     })
    // },
    // saveUserName(store, { userName }) {
    //   todosService.updateUserName(userName)
    //     .then(() => {
    //       store.commit({ type: "setUserName", userName: userName });
    //     })
    //   }
  }
};

import UserService from "../services/UserService.js";

export default {
  state: {
    users: [],
    currUser: null
  },
  mutations: {
    setCurrUser(state, { user }) {
      state.currUser = user;
    },
    saveUser(state, { user }) {
      state.users.push(user);
    },
    setUsers(state, { users }) {
      state.users = users;
    }
  },
  getters: {
    loggedinUser(state) {
      return state.loggedinUser;
    },
    getCurrUser(state) {
      return state.currUser;
    },
    getUsers(state) {
      return state.users;
    }
  },
  actions: {
    loadUsers(store) {
      return UserService.getUser()
        .then(users =>
          store.commit({
            type: "setUsers",
            users
          })
        )
        .catch(err => err);
    },

    login(store, { userCredentials }) {
      return UserService.login(userCredentials).then(user => {
        store.commit({ type: "setCurrUser", user });
      });
    },
    logout(store) {
      return UserService.logout().then(() => {
        store.commit({ type: "setCurrUser", user: null });
      });
    },

    register(store, { user }) {
      console.log("$$$$$$$$$$$$$", user);

      return UserService.saveUser(user).then(() => {
        store.commit({ type: "saveUser", user });
      });
    }
  }
};

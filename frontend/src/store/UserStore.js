import UserService from '../services/UserService.js'

export default {
    state: {
        loggedinUser: null
      },
      mutations: {
        setUser(state, {user}) {
          state.loggedinUser = user;
        }
      },
      getters: {
        loggedinUser(state) {
          return state.loggedinUser;
        }
      },
      actions: {
        login(store, {userCredentials}) {
          return UserService.login(userCredentials)
          .then(user=>{
            store.commit({type: 'setUser', user});
          })
        },
        logout(store) {
            console.log(store);
            return UserService.logout()
            .then(()=>{
              store.commit({type: 'setUser', user: null});
            })
          }
      }
}
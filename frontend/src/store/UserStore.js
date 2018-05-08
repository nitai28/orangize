import UserService from '../services/UserService.js'

export default {
    state: {
        loggedinUser: null,
        users:[],
        currUser:null
      },
      mutations: {
        setUsers(state, {user}) {
          state.loggedinUser = user;
        },
        saveUser(state, {user}){
          state.users.push(user)
        },
        updateCurrUser(state,{user}){
          console.log('store curr user',user);
          state.currUser=user;
        }
      },
      getters: {
        loggedinUser(state) {
          return state.loggedinUser;
        }
      },
      actions: {
        // loadUsers(store) {
        //   return UserService.getUsers()
        //     .then(users => store.commit({
        //       type: "setUsers",
        //       users
        //     }))
        //     .catch(err => err);
        // },


        login(store, {userCredentials}) {
          return UserService.login(userCredentials)
          .then(user=>{
            store.commit({type: 'setUser', user});
          })
        },
        logout(store) {
            return UserService.logout()
            .then(()=>{
              store.commit({type: 'setUser', user: null});
            })
          },

        register(store,{user}) {
          console.log('$$$$$$$$$$$$$',user);
          
            return UserService.saveUser(user)
            .then(()=>{
              store.commit({type: 'saveUser', user});
            })

          } 
      }
}
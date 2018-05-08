import EventBusService, { SHOW_MSG } from "./EventBusService.js";

function emptyUser() {
  return {
    _id: "",
    name: "",
    email: "",
    password: "",
    img: "",
    isLoggedin: "",
    isAdmin: "",
    tasks: []
  };
}

function getUser() {
  return axios
    .get("/user")
    .then(res => res.data)
    .catch(e => console.log("No User", e));
}

function saveUser(user) {
  return getUser().then(users => {
    let userFromDB = users.find(DBuser => DBuser.name === user.name);
    if (!userFromDB) {
      // TODO: Add on DB and then Event msg.
      EventBusService.$emit(SHOW_MSG,{ txt: "Registration Completed! please login",type:'success'});
      return axios.post("/user", user)
    } else {
      EventBusService.$emit(SHOW_MSG, {
        txt: `Username has been taken already.`,
        type: 'danger'
      });
      throw new Error('Username has been taken already.')
    }
  });
  // axios.put(_getUserUrl(user._id), user);
  // console.log("$$$$", DBusers);
}

// getUser().then(res => {
//   let users = res.data;
//   console.log("$$$$", users);
//   let isUserValid = users.filter(
//     DBuser => DBuser.password === user.password && DBuser.name === user.name
//   );
//   if (!isUserValid) return axios.post("/user", user);
//   else {
//     var userMsg = { txt: "This User already vaild ", type: "success" };
//     EventBusService.$emit(SHOW_MSG, userMsg);
//   }
// });

// if (user._id) return axios.put(_getUserUrl(user._id), user);
// else return axios.post("/user", user);
// }

function deleteUser(userId) {
  return axios.delete(_getUserUrl(userId));
}

function getUserById(userId) {
  return axios.get(_getUserUrl(userId)).then(res => res.data);
}

function checkLogin(userCred) {
  return axios
    .post(`/user/login`, userCred)
    .then(res => {
      delete res.data.password;
      console.log("log in", res.data);
      var userMsg = { txt: "succesful-login", type: "success" };
      EventBusService.$emit(SHOW_MSG, userMsg);
      // this.$store.commit({type:'updateCurrUser',currUser: newUser})
      return res.data;
    })
    .catch(e => {
      var userMsg = { txt: "Faild to login please Sign Up", type: "danger" };
      EventBusService.$emit(SHOW_MSG, userMsg);
    });
  // throw new Error(e)});
}

function _getUserUrl(userId) {
  return `/${userId}`;
}

export default {
  getUser,
  saveUser,
  deleteUser,
  emptyUser,
  getUserById,
  checkLogin
};
// deleteMultUsers

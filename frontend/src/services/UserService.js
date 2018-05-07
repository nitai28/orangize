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
    .get()
    .then(res => res.data)
    .catch(e => console.log("No User", e));
}

function saveUser(user) {
  if (user._id) return axios.put(_getUserUrl(user._id), user);
  else return axios.post("/user", user);
}

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
      console.log("log in", res.data);
      var userMsg = { txt: "succesful-login", type: 'success' };
      EventBusService.$emit(SHOW_MSG, userMsg);
      return res.data;
    })
    .catch(e => {
      var userMsg = { txt: "faild to login", type: 'danger' };
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


function emptyUser() {
  return {_id:'',name: '', email:'',password:'',img:'',isLoggedin:'',isAdmin:'',items:[]}
}

function getUser() {
  return axios
          .get()
          .then(res => res.data)
          .catch(e => console.log('No User', e))
}

function saveUser(user) {
  if (user._id) return axios.put(_getUserUrl(user._id), user)
  else return axios.post(user);  
}

function deleteUser(userId) {
  return axios.delete(_getUserUrl(userId))
}


function getUserById(userId) {
  return axios
  .get(_getUserUrl(userId))
  .then(res => res.data)
}

// function deleteMultUsers(userIds) {
// }

function _getUserUrl(userId) {
  return `/${userId}`;
}

export default {
  getUser,
  saveUser,
  deleteUser,
  emptyUser,
  getUserById
}
  // deleteMultUsers
import axios from 'axios';
const BASE_URL = 'localhost:3000'

function login(user) {

  return axios
    .post(`${BASE_URL}/login`, user)
    .then(res => {
      sessionStorage.user = JSON.stringify(res.data.user)
      return res.data.user
    })
    .catch(() => {throw new Error('Login Failed')})
}

function register(user) {
  return axios
    .post(`${BASE_URL}/register`, user)
    .then(res => console.log(res.data))
    .catch(() => {throw new Error('Register Failed')})
}

function logout() {
  return axios
    .post(`${BASE_URL}/logout`)
    .then(() => {
      delete sessionStorage.user;
    })
    .catch(() => {throw new Error('Logout Failed')})
}

export default {
  login,
  register,
  logout
};

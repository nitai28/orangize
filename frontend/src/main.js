import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./css/main.css";

import axios from 'axios';

window.axios = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: true
});

const VueCookie = require('vue-cookie');
Vue.use(VueCookie);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
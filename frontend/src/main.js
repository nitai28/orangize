import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./css/main.css";
import axios from "axios";

let BASE_URL = `http://localhost:3000`;
// if (process.env.NODE_ENV !== "development") {
//   BASE_URL = "";
// }

window.axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

import Notifications from 'vue-notification'
Vue.use(Notifications);

const VueCookie = require('vue-cookie');
Vue.use(VueCookie);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

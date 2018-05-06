import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/LoginPage.vue";
import Register from "./views/RegisterPage.vue";
import MyStore from "./store/index.js";
import OrangizeApp from "./views/OrangizeApp.vue";
import RegisterTest from "./views/RegisterTest.vue";
// import Profile from './views/Profile.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "Home", component: Home },
    {
      path: "/orangize",
      component: OrangizeApp,
      // beforeEnter: userOnlyRoute
    },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/orangize/:id", component: OrangizeApp },
    { path: "/registerTest", component: RegisterTest },
  ]
});

// // Navigation Guards
// function userOnlyRoute(to, from, next) {
//   const user = MyStore.getters.loggedinUser;
//   console.log('Navigation Guard!', user);
//   next(user != null);
// }
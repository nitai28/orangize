import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Login from "./views/LoginPage.vue";
import MyStore from "./store/index.js";
import OrangizeApp from "./views/OrangizeApp.vue";

Vue.use(Router);

export default new Router({
  routes: [
    // { path: "/", name: "Home", component: Home },
    { path: "/", component: OrangizeApp,
      // beforeEnter: userOnlyRoute
    },
    { path: "/login", component: Login },
    { path: "/About", component: About },
    { path: "/task/:id", component: OrangizeApp },
  ]
});

// // Navigation Guards
// function userOnlyRoute(to, from, next) {
//   const user = MyStore.getters.loggedinUser;
//   console.log('Navigation Guard!', user);
//   next(user != null);
// }
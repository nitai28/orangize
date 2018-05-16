import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./css/main.css";
import axios from "axios";

let BASE_URL = `http://localhost:3000`;
if (process.env.NODE_ENV !== "development") {
  BASE_URL = "";
}

window.axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// definition of a directive to allow change position of element by dragging it
Vue.directive("draggable-touch", {
  bind: function(el) {
    el.style.position = "absolute";
    var startX, startY, initialMouseX, initialMouseY;
    console.log("Started");
    function mousemove(e) {
      var dx = e.clientX - initialMouseX;
      var dy = e.clientY - initialMouseY;
      var dx = e.changedTouches[0].clientX - initialMouseX;
      var dy = e.changedTouches[0].clientY - initialMouseY;
      el.style.top = startY + dy + "px";
      el.style.left = startX + dx + "px";
      return false;
    }
    function mouseup() {
      document.removeEventListener("touchmove", mousemove);
      document.removeEventListener("touchend", mouseup);
    }

    el.addEventListener("touchstart", function(e) {
      e.stopPropagation();
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialMouseX = e.changedTouches[0].clientX;
      initialMouseY = e.changedTouches[0].clientY;
      document.addEventListener("touchmove", mousemove);
      document.addEventListener("touchend", mouseup);
      console.log("ended", el);
      return false;
    });
  }
});

Vue.directive("drugs", {
  bind: function(el) {
    el.style.position = "absolute";
    var startX, startY, initialMouseX, initialMouseY;

    function mousemove(e) {
      var dx = e.clientX - initialMouseX;
      var dy = e.clientY - initialMouseY;
      el.style.top = startY + dy + "px";
      el.style.left = startX + dx + "px";
      return false;
    }

    function mouseup() {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    }

    el.addEventListener("mousedown", function(e) {
      startX = el.offsetLeft;
      startY = el.offsetTop;
      initialMouseX = e.clientX;
      initialMouseY = e.clientY;
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
      return false;
    });
  }
});
const VueCookie = require('vue-cookie');
Vue.use(VueCookie);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

<template>
    <section id="app">
        <nav-bar></nav-bar>
        <user-msg></user-msg>        
        <router-view></router-view>
        <notifications position="bottom center" classes="error-msg snackbar-msg" group="error" />
        <notifications position="bottom center" classes="success-msg snackbar-msg" group="success" />
    </section>
</template>
<script>
import UserMsg from "./components/global/UserMsg.vue";
import NavBar from "./components/global/NavBar.vue";
import UserService from "./services/UserService";
import EventBusService from "./services/EventBusService";
export default {
  name: "app",
  components: {
    UserMsg,
    NavBar
  },
  created() {
    UserService.checkLoggedIn().then(updatedUser => {
      this.$store.commit({ type: "setCurrUser", user: updatedUser });
    });
    EventBusService.$on("NotLoggedInError", () => {
      this.$notify({
        group: "error",
        title: "Not logged-in",
        text: "You've to log-in first."
      });
    });
  }
};
</script>

<style>
.notification-wrapper {
  overflow: visible;
}
.snackbar-msg {
  padding: 5px;
  margin-bottom: 7px;
  border-radius: 5px;
  width: 250px;
  /* text-align: center; */
  box-shadow: 0px 1px 1px 1px #000000b0;
}

.success-msg {
    background: #23ff06ba;
}
.error-msg {
  background: #ff5806ba;
}

.error-msg .notification-title {
  font-size: 20px;
}
</style>

<template>
    <section id="app">
        <nav-bar></nav-bar>
        <user-msg></user-msg>        
        <router-view></router-view>
    </section>
</template>
<script>
import UserMsg from "./components/global/UserMsg.vue";
import NavBar from "./components/global/NavBar.vue";
import UserService from './services/UserService';
export default {
  name: "app",
  components: {
      UserMsg,
      NavBar
  },
  created() {
        UserService.checkLoggedIn().then(updatedUser => {
            this.$store.commit({type:'setCurrUser', user: updatedUser})
        })
    },
};
</script>

<style scoped>

</style>

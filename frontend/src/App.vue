<template>
    <section id="app">
        <router-link to="/">Home</router-link> |
        <router-link to="/orangize">Orangize</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/registerTest">RegisterTest</router-link>
        <user-msg></user-msg>        
        <router-view></router-view>
    </section>
</template>
<script>
import UserMsg from "./components/global/UserMsg.vue";

export default {
  name: "app",
  components: {
      UserMsg
  }
};
</script>

<style scoped>

</style>

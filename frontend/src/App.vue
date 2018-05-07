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

export default {
  name: "app",
  components: {
      UserMsg,
      NavBar
  }
};
</script>

<style scoped>

</style>

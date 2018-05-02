<template>
  <section class="nav-bar">
        <router-link to="chat">Chat</router-link>
        <router-link v-if="!loggedinUser" to="register">Register</router-link>
        <router-link v-if="!loggedinUser" to="login">Login</router-link>
        <router-link v-if="loggedinUser" to="admin">Admin</router-link>
        <router-link v-if="loggedinUser" to="dog">Dogs App</router-link>
        <button v-if="loggedinUser" @click="logout">{{loggedinUser.name}} Logout</button>
    </section>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log("Logging out!");
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  }
};
</script>

<style>

</style>


export default {
   
}
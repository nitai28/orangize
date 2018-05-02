<template>
  <section class="login-page">
        <form @submit.prevent="checkLogin">
            <input ref="txtUserName" type="text" placeholder="User name" v-model="user.name" />
            <input type="password" placeholder="Enter your Password" v-model="user.password"/>
            <button type="submit" :disabled="!this.user.name || !this.user.password">Login</button>
        </form>
    </section>
</template>

<script>
import UserService from '../services/UserService.js';
import EventBusService, { SHOW_MSG } from '../services/EventBusService.js'

export default {
  name: "LoginPage",
  data() {
    return {
      user: { name: "muki", password: "muki" }
    };
  },
  created() {},
  methods: {
    checkLogin() {
      this.$store
        .dispatch({ type: "login", userCredentials: this.user })
        .then(res => {
          console.log("You have been logged-in!");
          EventBusService.$emit(SHOW_MSG, { txt: `Welcome ${this.user.name}` });
          this.$router.push("/chat");
        })
        .catch(err => {
          console.log("Login Failed!");
          EventBusService.$emit(SHOW_MSG, {
            txt: `Wrong Credentials, please try again`,
            type: "danger"
          });
          this.$refs.txtUserName.focus();
        });
    }
  },
  computed: {}
};
</script>

<style>

</style>

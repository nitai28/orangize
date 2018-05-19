<template>
  <section class="login-page">
    <h1>Login:</h1>
        <form @submit.prevent="checkLogin">
            <input ref="txtUserName" type="text" placeholder="User name" v-model="user.name" />
            <input type="password" placeholder="Enter your Password" v-model="user.password"/>
            <button type="submit" :disabled="!this.user.name || !this.user.password">Login</button>
        </form>
    </section>
</template>

<script>
import UserService from '../services/UserService.js';
import EventBusService , { SHOW_MSG } from  '../services/EventBusService.js'

export default {
  name: "LoginPage",
  data() {
    return {
      user: { name:'' , password: '' }
    };
  },
  created() {
    
  },
  methods: {
    checkLogin(){
          UserService.checkLogin(this.user).then(updatedUser => {
            console.log('updatedUser', updatedUser)
            this.$store.commit({type:'setCurrUser',user:updatedUser})
            this.$router.push('/')
              this.$notify({
                group: "success",
                title: "Log-in",
                text: 'Hello,  You\'ve been logged-in successfully!'
              });

          })
        }
  },
  computed: {}
};
</script>

<style>

</style>
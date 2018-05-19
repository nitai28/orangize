<template>
  <section class="register">
    <div class="container">
    <form @submit.prevent="register" class="signUp" :class="{ 'active-sx': !this.isLoginMode, 'inactive-sx': this.isLoginMode }">
      <h3>Create Your Account</h3>
      <p>Just enter your user name and your password for join.</p>
      <input class="w100" type="text" placeholder="Insert Username" v-model="user.name" required autocomplete='off' />
      <input type="password" placeholder="Insert Password" v-model="user.password" required />
      <input type="password" placeholder="Verify Password" v-model="verifyPass" required />
      <button class="form-btn sx log-in" @click="toggleLoginMode" type="button">Log In</button>
      <button class="form-btn dx" type="submit" :disabled="!this.user.name || !this.user.password">Sign Up</button>
    </form>
    <form @submit.prevent="checkLogin" class="login" :class="{ 'active-dx': this.isLoginMode, 'inactive-dx': !this.isLoginMode }">
      <h3>Welcome Back !</h3>
      <input ref="txtUserName" type="text" placeholder="Insert Username" v-model="user.name" autocomplete='off' required />
      <input type="password" v-model="user.password" placeholder="Insert Password" required />
      <button class="form-btn sx back" @click="toggleLoginMode" type="button">Back</button>
      <button class="form-btn dx" type="submit" :disabled="!this.user.name || !this.user.password">Log In</button>
    </form>
    </div>
  </section>
</template>

<script>
import UserService from '../services/UserService';
import EventBusService, { SHOW_MSG } from '../services/EventBusService.js'

export default {
  name: 'LoginPage',
  data() {
    return {
      user: { name: '', password: '' },
      verifyPass: '',
      isLoginMode: true
    }
  },
  methods: {
    toggleLoginMode() {
      this.isLoginMode = !this.isLoginMode;
      this.user = {name: '', password: ''}
    },
    register() {
      if(this.verifyPass !== this.user.password) return false;
       UserService.saveUser(this.user)
        .then(res => {
          let newUser = res.data;
          this.toggleLoginMode()
        })
    },
    checkLogin() {
        UserService.checkLogin(this.user).then(updatedUser => {
            this.$store.commit({type:'setCurrUser',user:updatedUser})
            this.$router.push('/')
            this.$notify({
                group: "success",
                title: `Hello, ${this.user.name}`,
                text: 'You\'ve been logged-in successfully!'
            });
        })
    }
    },
  }
// };
</script>

<style scoped>

body {
  background: #ffc185;
  margin: 0 auto;
}

.container {
  position: relative;
  display:flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

form {
  position: absolute;
  text-align: center;
  background: #fff;
  width: 310px;
  height: 470px;
  border-radius: 5px;
  padding: 30px 20px 0 20px;
  box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

p {
  font-family: "Mina", sans-serif;
  font-weight: 100;
  text-transform: uppercase;
  font-size: 12px;
  color: #87613d;
  margin-bottom: 40px;
}

p > span {
  padding-top: 3px;
  display: block;
  font-weight: 400;
  font-size: 9px;
}

h3 {
  font-family: "Tenor";
  font-size: 35px;
  text-transform: uppercase;
  color: #87613d;
  margin-bottom: 30px;
}

input,
button {
  outline: none !important;
}

button.fb {
  border: none;
  background: #3b5998;
  width: 160px;
  height: 25px;
  font-family: "Mina", sans-serif;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
  border-radius: 4px;
  border: 1px solid #29487d;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s linear;
}
button.fb:hover {
  background: #fff;
  color: #3b5998;
}

button.form-btn {
  position: absolute;
  width: 50%;
  height: 60px;
  bottom: 0;
  border: 0;
  font-family: "Tenor";
  font-size: 24px;
  text-transform: uppercase;
  cursor: pointer;
}

button.form-btn.sx {
  left: 0;
  border-radius: 0 0 0 5px;
  background-color: rgba(255, 125, 0, 0.35);
  color: #fff;
  transition: all 0.3s linear;
}

button.form-btn.sx:hover {
  background-color: rgba(255, 125, 0, 0.65);
  color: #fff;
}

button.form-btn.sx.back {
  background-color: rgba(0, 0, 0, 0.15);
  transition: all 0.3s linear;
}

button.form-btn.sx.back:hover {
  background-color: rgba(0, 0, 0, 0.35);
}

button.form-btn.dx {
  right: 0;
  border-radius: 0 0 5px 0;
  background-color: #ff7d00;
  color: #fff;
}

input {
  border: none;
  border-bottom: 1px solid #ffc185;
  width: 85%;
  font-family: "Mina";
  color: #ff7d00;
  text-align: center;
  font-size: 21px;
  font-weight: 100;
  margin-bottom: 25px;
}

::-webkit-input-placeholder {
  color: #ffc185;
  font-family: "Mina";
  font-weight: 100;
}

:-moz-placeholder {
  color: #ffc185;
  font-family: "Mina";
  font-weight: 100;
}

::-moz-placeholder {
  color: #ffc185;
  font-family: "Mina";
  font-weight: 100;
}

:-ms-input-placeholder {
  color: #ffc185;
  font-family: "Mina";
  font-weight: 100;
}

.signIn input,
.signUp .w100 {
  width: 100%;
}

.signIn {
  z-index: 1;
  transform: perspective(100px) translate3d(100px, 0px, -30px);
  opacity: 0.5;
}

.signUp {
  z-index: 2;
}

.active-dx {
  animation-name: foregrounding-dx;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;
}

.active-sx {
  animation-name: foregrounding-sx;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;
}

.inactive-dx {
  animation-name: overshadowing-dx;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;
}

.inactive-sx {
  animation-name: overshadowing-sx;
  animation-duration: 0.9s;
  animation-fill-mode: forwards;
}

@keyframes overshadowing-dx {
  0% {
    z-index: 2;
    transform: perspective(100px) translate3d(0px, 0px, 0px);
    opacity: 1;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
  }
  100% {
    z-index: 1;
    transform: perspective(100px) translate3d(100px, 0px, -30px);
    opacity: 0.5;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
  }
}

@keyframes overshadowing-sx {
  0% {
    z-index: 2;
    transform: perspective(100px) translate3d(0px, 0px, 0px);
    opacity: 1;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
  }
  100% {
    z-index: 1;
    transform: perspective(100px) translate3d(-100px, 0px, -30px);
    opacity: 0.5;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
  }
}

@keyframes foregrounding-dx {
  0% {
    z-index: 1;
    transform: perspective(100px) translate3d(100px, 0px, -30px);
    opacity: 0.5;
  }
  50% {
    z-index: 2;
    transform: perspective(100px) translate3d(400px, 0px, -30px);
  }
  100% {
    z-index: 2;
    transform: perspective(100px) translate3d(0px, 0px, 0px);
    opacity: 1;
  }
}

@keyframes foregrounding-sx {
  0% {
    z-index: 1;
    transform: perspective(100px) translate3d(-100px, 0px, -30px);
    opacity: 0.5;
  }
  50% {
    z-index: 2;
    transform: perspective(100px) translate3d(-400px, 0px, -30px);
  }
  100% {
    z-index: 2;
    transform: perspective(100px) translate3d(0px, 0px, 0px);
    opacity: 1;
  }
}
</style>

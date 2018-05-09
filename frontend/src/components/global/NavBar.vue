<template>
  <section class="nav-bar flex space-around align-center justify-center">
    <router-link to="/">Home</router-link>
    <router-link to="/orangize">Orangize</router-link>
    <div class="flex">
    <i class="orangize"></i> <span>Orangize</span>
    </div>
    <!-- <button v-if="currUser" @click="logout">{{currUser.name}} Logout</button> -->
    <!-- <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link> -->
     <router-link v-if="currUser" @click.native="logout" to="/orangize">{{currUser.name}} Logout</router-link>
    <router-link v-else to="/registerTest">Register</router-link>
  </section>
</template>

<script>
export default {
  computed: {
    currUser(){
      return this.$store.getters.getCurrUser;
    }
  },
  methods:{
      logout() {
            console.log('Logging out!');
            this.$store.dispatch({type: 'logout'}).then(()=>{
            })
        }
  }
};
</script>

<style scoped>
/* 
Black: #231f20
LightOrange: #f26531
WHITE: #f5f5f5
*/

.nav-bar {
  background: #231f20;
  height: 40px;
  box-shadow: 0px 0px 4px 2px #000000c4;
}
a {
  /* display:block; */
  color: #f26531;
  transition: color .2s ease-in-out;
}
a:hover {
  color: #f5f5f5;
}
.orangize {
  display: inline-block;
  background-image: url("../../assets/icon/orange.svg");
  width: 30px;
  height: 30px;
}
span {
  color: #f26531;
  font-family: Kaushan;
}
</style>
<template>
  <section class="nav-bar flex space-between align-center justify-left">
    <router-link to="/about">About</router-link>
    <div class="logo-container flex align-center">
      <router-link to="/"><div class="logo flex">
      <i></i> <span>rangize</span>
      </div></router-link>
    </div>
     <router-link v-if="currUser" @click.native="logout" to="/orangize">{{currUser.name}} Logout</router-link>
    <router-link v-else to="/registerTest">Login</router-link>
  </section>
</template>

<script>
export default {
  computed: {
    currUser(){
      console.log('currUserChanged', this.$store.getters.getCurrUser)
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
  padding: 0px 20px;
  color: #f26531;
  transition: color 0.2s ease-in-out;
}
a:hover {
  color: #f5f5f5;
}

.logo-container {
  position: relative;
  background: inherit;
  height: 95px;
  height: 80px;
  width: 210px;
  border-radius: 0px 0px 45px 45px;
  box-shadow: inherit;
  padding-bottom: 25px;

}

.logo i {
  display: inline-block;
  background-image: url("../../assets/icon/orange.svg");
  background-repeat: no-repeat;
  width: 45px;
  height: 45px;
}
.logo {
  position:absolute;
  font-size: 40px;
  line-height: 40px;
}

.logo:hover {
  position:absolute;
  font-size: 40px;
  line-height: 40px;
}

span {
  color: #f26531;
  font-family: Kaushan;
}
</style>
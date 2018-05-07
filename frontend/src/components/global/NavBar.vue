<template>
  <section class="nav-bar flex space-around align-center justify-center">
    <router-link to="/">Home</router-link>
    <router-link to="/orangize">Orangize</router-link>
    <div class="flex">
    <i class="orangize"></i> <span>Orangize</span>
    </div>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
    <!-- <router-link to="/registerTest">RegisterTest</router-link> -->
  </section>
</template>

<script>
export default {
  computed: {
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
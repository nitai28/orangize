<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <h1> This is my homepage.</h1>

    <drag></drag>
  </div>
</template>

<script>
import Drag from '../components/task/Drag.vue';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import GreatBox from '@/components/great-box.vue'
export default {
    name: 'Home',
    components: {
      Drag
    }
}
</script>
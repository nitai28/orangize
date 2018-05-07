
<template>
    <section class='orangize-app'>
        <i class="orangize"></i> <h1>Orangize</h1>
        <card-list></card-list>
    </section>
</template>

<script>

import SocketSerivce from '../services/SocketService.js'

import CardList from '../components/task/CardList.vue';

export default {
  name: 'OrangizeApp',
  data() {
    return {
    };
  },
  created() {
    SocketSerivce.connectSocket(); 
  },
  components: {
    CardList,
  }
};
</script>

<style scoped>
  .orangize {
    display: inline-block;
    background-image: url('../assets/icon/orange.svg');
    width: 30px;
    height: 30px;
  }
  h1 {
    display: inline-block; 
  }
</style>
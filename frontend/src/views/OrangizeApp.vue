
<template>
    <section class='orangize-app'>
        <i class="orangize"></i> <h1>Orangize</h1>
        <card-list></card-list>
    </section>
</template>

<script>

<<<<<<< HEAD
import TaskList from '../components/task/TaskList.vue';
// import SocketSerivce from '../services/SocketService.js'

=======
import CardList from '../components/task/CardList.vue';
>>>>>>> 02f231682cf98b91b83b8baa3fba475510a691ff

export default {
  name: 'OrangizeApp',
  data() {
    return {
    };
  },
  created() {
    // SocketSerivce.connectSocket(); 
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
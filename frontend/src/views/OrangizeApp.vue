
<template>
    <section class='orangize-app'>
        <i class="orangize"></i> <h1>Orangize</h1>
        <task-list></task-list>
    </section>
</template>

<script>

import TaskList from '../components/task/TaskList.vue';

export default {
  name: 'OrangizeApp',
  data() {
    return {
    };
  },
  created() {

  },
  components: {
    TaskList,
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
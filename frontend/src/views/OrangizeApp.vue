
<template>
    <section class='orangize-app'>
        <i class="orangize"></i> <h1>Orangize</h1>
        <user-msg></user-msg>
        <task-list></task-list>
        <card-list></card-list>
    </section>
</template>

<script>
import TaskList from "../components/task/TaskList.vue";
import UserMsg from "../components/global/UserMsg.vue";

import SocketSerivce from '../services/SocketService.js'
import TaskList from '../components/task/TaskList.vue';
import CardList from '../components/task/CardList.vue';

export default {
  name: "OrangizeApp",
  data() {
    return {
    };
  },
  created() {
    SocketSerivce.connectSocket(); 
  },
  components: {
    TaskList,
    UserMsg,
    CardList,
  }
};
</script>

<style scoped>
.orangize {
  display: inline-block;
  background-image: url("../assets/icon/orange.svg");
  width: 30px;
  height: 30px;
}
h1 {
  display: inline-block;
}
</style>
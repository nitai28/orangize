
<template>
    <section class='orangize-app'>
        <i class="orangize"></i> <h1>Orangize</h1>
        <user-msg></user-msg>
        <task-list></task-list>
        <card-list></card-list>
    </section>
</template>

<script>
import UserMsg from "../components/global/UserMsg.vue";
import CardList from '../components/task/CardList.vue';

export default {
  name: "OrangizeApp",
  data() {
    return {};
  },
  created() {},
  components: {
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

<template>
    <section class='orangize-app'>
        <user-msg></user-msg>
        <card-list></card-list>
        <activity-log></activity-log>
    </section>
</template>

<script>

import UserMsg from "../components/global/UserMsg.vue";
import CardList from '../components/task/CardList.vue';
import ActivityLog from '../components/activity/ActivityLog.vue'

export default {
  name: "OrangizeApp",
  data() {
    return {
    };
  },
  components: {
    UserMsg,
    CardList,
    ActivityLog,
  }
};
</script>

<style scoped>
h1 {
  display: inline-block;
}
</style>
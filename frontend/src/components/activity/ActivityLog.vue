<template>
  <section  v-drugs class="activity-log" :class="{open: isOpen}">
    <button class="toggle-btn" @click="isOpen = !isOpen">Activity Log</button>
    <ul class="clean-list activities-container">
        <li v-for="activity in activities" :key="activity._id" class="activity-container flex space-between">
          <div class="activity-txt">{{activity.txt}}</div> <div class="timestamp">{{activity.at | changeDateFilter}}</div>
        </li>
    </ul>
  </section>
</template>

<script>
const moment = require('moment');

export default {
  data() {
    return {
      isOpen: true,
      activity: {txt: 'Yotam has deleted a task.', at: new Date(2018, 4, 24)},
      activity2: {txt: 'Itay has updated a task.', at: Date.now()}
    };
  },
  created() {
    this.$store.dispatch({ type: "loadActivities" });    
  },
  computed: {
    activities() {
      // console.log('ACTIVITIES:', this.$store.getters.getActivities)
      return this.$store.getters.getActivities;
    }
  },
  filters: {
    changeDateFilter:
      function(value) {
        return moment(value).fromNow();
      }
  },
};
</script>

<style scoped>
/* 
Black: #231f20
LightOrange: #f26531
WHITE: #f5f5f5
*/

.activity-log {
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 30px;
  transition: height 0.3s ease-in-out;
}
.activity-log.open {
  height: 300px;
}

.toggle-btn {
  width: 105px;
  height: 30px;
  color: #f26531;
  background: #231f20d5;
  border-radius: 0px 10px 0px 0px;
  border: none;
  cursor: pointer;
  outline: none;
  font: inherit;
  padding: 2px;
  transition: color 0.1s ease-in-out;
}

.toggle-btn:hover {
  color: #f5f5f5;
}

.activities-container {
  overflow-y: scroll;
  padding: 7px 4px;
  background: #231f20d5;
  color: #f26531;
  color: #f5f5f5;
  height: 300px;
  width: 300px;
  /* margin-top: -0.5px; Stucks the toggle-btn together with log. */
}

.activity-container {
  padding: 2px;
  padding-left: 5px;
  font-size: 14px;
  height: 50px;
  overflow: hidden;
  background: #231f20;
  margin-bottom: 4px;
  box-shadow: 0px 1px 2px 1px #000000b0;
}

.activity-txt {
  width:70%;
  }

.timestamp {
  width:30%;
  text-align: center;
  color: #f5f5f5a9;
  padding: 1px;
  font-size: 13px;
  align-self: flex-start;
}
</style>

<template>
  <section class="activity-log" :class="{open: isOpen}">
    <button class="toggle-btn" @click="isOpen = !isOpen">Activity Log</button>
    <ul class="clean-list activities-container">
        <!-- <li class="activity-container"><div class="timestamp">{{activity.at | changeDateFilter}}</div> <div class="activity-txt">{{activity.txt}}</div> </li> -->
        <li class="activity-container"><div class="activity-txt">{{activity2.txt}}</div> <div class="timestamp">{{activity2.at | changeDateFilter}}</div></li>
        <li class="activity-container"><div class="activity-txt">{{activity2.txt}}</div> <div class="timestamp">{{activity2.at | changeDateFilter}}</div></li>
        <li class="activity-container"><div class="activity-txt">{{activity2.txt}}</div> <div class="timestamp">{{activity2.at | changeDateFilter}}</div></li>
        <li class="activity-container"><div class="activity-txt">{{activity2.txt}}</div> <div class="timestamp">{{activity2.at | changeDateFilter}}</div></li>
        <li class="activity-container"><div class="activity-txt">{{activity2.txt}}</div> <div class="timestamp">{{activity2.at | changeDateFilter}}</div></li>
        <li class="activity-container"><div class="activity-txt">{{activity2.txt}}</div> <div class="timestamp">{{activity2.at | changeDateFilter}}</div></li>
        <!-- <li class="activity-container flex space-between justify-center align-center"><span class="activity-txt">{{activity.txt}}</span> <span class="timestamp">{{activity.at | changeDateFilter}}</span></li>
        <li class="activity-container flex space-between justify-center align-center"><span class="activity-txt">{{activity.txt}}</span> <span class="timestamp">{{activity2.at | changeDateFilter}}</span></li>
        <li class="activity-container flex space-between justify-center align-center"><span class="activity-txt">{{activity2.txt}}</span> <span class="timestamp">{{activity.at | changeDateFilter}}</span></li> -->
    </ul>
  </section>
</template>

<script>
const moment = require('moment');
import Draggable from 'vuedraggable';

export default {
  data() {
    return {
      isOpen: true,
      activity: {txt: 'Yotam has deleted a task.', at: Date.now()},
      activity2: {txt: 'Itay has updated a task.', at: Date.now()}
    };
  },
  filters: {
    changeDateFilter:
      function(value) {
        return moment(value).fromNow();
      }
  },
  components: {
    Draggable
  }
};
</script>

<style>
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
}

.activities-container {
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
  height: 40px;
  overflow: hidden;
  background: #231f20;
  margin-bottom: 4px;
  box-shadow: 0px 1px 2px 1px #000000b0;
  padding-left: 5px;
}

.activity-txt {
  height: 18px;
}

.timestamp {
  color: #f5f5f5a9;
  height: 15px;
  width: 100%;
  padding: 1px;
  font-size: 13px;
}
</style>

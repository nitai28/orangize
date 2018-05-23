<template>
  <!-- <section  v-drugs class="activity-log" :class="{open: isOpen}"> -->
  <section class="activity-log" :class="{open: isOpen}">
    <button class="toggle-btn" @click="isOpen = !isOpen">Activity Log</button>
    <ul class="clean-list activities-container">
        <li v-for="activity in activities" :key="activity._id" class="activity-container flex space-between">
          <div class="activity-txt">{{activity.txt}}<span class="user-name">{{activity.by.user.name}}</span>.</div> <div class="timestamp">{{activity.at | changeDateFilter}}</div>
        </li>
    </ul>
  </section>
</template>

<script>
const moment = require('moment');

export default {
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    this.$store.dispatch({ type: "loadActivities" });    
  },
  computed: {
    activities() {
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
  right: 0px;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  transform: translate(195px, 300px);
}
.activity-log.open {
  transform: translate(0px, 0px);
}

.toggle-btn {
  width: 105px;
  height: 30px;
  color: #f26531;
  background: #231f20d5;
  border-radius: 10px 10px 0px 0px;
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

::-webkit-scrollbar {
   width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
   box-shadow: inset 0 0 2px #231f20;
   border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
   background: #f26531;
   border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
   background: #f26531; 
}
/*
Black: #231f20
LightOrange: #f26531
WHITE: #f5f5f5
*/
.user-name{
  color: #23ff06;
}
</style>

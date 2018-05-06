<template>
    <section class="task-preview" :class="{[task.label]: (task.label) }" @click="showDetails(task)">
        <h3>{{ task.title }}</h3>
        <button class="delete-task" @click.stop="removeTask(task)"><img src="../../assets/icon/rubbish-bin.svg" /></button>
    </section>
</template>

<script>
import EventBusService from '../../services/EventBusService';
export default {
  name: "TaskPreview",
  props: ["task"],
  methods: {
    showDetails(task) {
      EventBusService.$emit('openModal');
      this.$store.commit({type: 'setSelectedTask', task});
    },
    removeTask(task) {
      this.$store.dispatch({ type: 'removeTask', task});
    }
  },
  computed:{
    label(){
      return this.task.labels[0]
    }
  }
};
</script>

<style scoped>
.task-preview {
  display: flex;
  flex-direction: row;
  background-color: #eae7e7f0;
  margin-bottom: 4px;
  border-radius: 5%;
  width: 100%;
  transition: width 0.5s ease-in-out;
}

h3 {
  width: 100%;
  padding: 5px;
  display: inline-block;
  border-radius: 5%;
}

.delete-task {
  display: inline-block;
  opacity: 0;
  transition: opacity .3s ease-in-out;
}

.delete-task img {
  width: 15px;
  height: 15px;
}

.delete-task:hover {
  opacity: 1;
}

.red {
  background: rgb(197, 0, 0);
}
.yellow {
  background: rgb(255, 136, 0);
}
.green {
  background: rgb(240, 224, 5);
}
.blue {
  background: rgb(35, 149, 7);
}
</style>

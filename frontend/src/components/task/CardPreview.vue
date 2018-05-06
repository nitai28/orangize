<template>
    <section class="card-preview">
        <draggable v-model="cardTasks" class="dragArea" :move="isFilter" :options="{group:'cardTasks'}">
            <li v-for="task in cardTasks" :key="task._id">
            <router-link :to="'/orangize/'+task._id">
                <task-preview :task="task"></task-preview>
            </router-link> 
            </li>
        </draggable>
    </section>
</template>

<script>
import TaskPreview from "./TaskPreview.vue";
import Draggable from "vuedraggable";

export default {
  name: "CardPreview",
  props: ["card", "tasks"],
  computed: {
    filter() {
      this.$store.getters.getFilter;
    },
    cardTasks: {
      get() {
        return this.tasks;
      },
      set(changedTasks) {
        this.$store.dispatch({
          type: "updateTasks",
          tasks: changedTasks,
          cardId: this.card._id
        });
      }
    }
  },
  methods: {
    isFilter: function() {
      return !this.$store.getters.getFilter.byLabel;
    }
  },
  components: {
    Draggable,
    TaskPreview
  }
};
</script>

<style>
.card-tasks {
  min-width: 200px;
  background-color: #c7c7c7f0;
  margin: 5px;
  border-radius: 5%;
}
.dragArea {
  min-height: 10px;
}
</style>

<template>
    <section class="card-preview">
        <draggable v-model="cardTasks" class="dragArea" :options="{group:'cardTasks'}">
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
  components: {
    Draggable,
    TaskPreview
  }
};
</script>

<style>
.dragArea {
  min-height: 10px;
}
</style>

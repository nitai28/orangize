<template>
    <section class="card-preview">
        <draggable v-if="card._id" element='ul' v-model="cardTasks" class="dragArea" :move="isMoveEnabled" :options="{ghostClass: 'ghost', group:'cardTasks'}">
            <li v-for="task in cardTasks" :key="task._id">
            <!-- <router-link :to="'/task/'+task._id"> -->
                <task-preview @removeTask="removeTask" :task="task"></task-preview>
            <!-- </router-link>  -->
            </li>
        </draggable>
    </section>
</template>

<script>
import TaskPreview from "./TaskPreview.vue";
import Draggable from "vuedraggable";
var debounce = require("debounce");

export default {
  name: "CardPreview",
  props: ["cards", "card", "tasks"],
  computed: {
    filter: function() {
      this.$store.getters.getFilter;
    },
    cardTasks: {
      get() {
        return this.tasks;
      },
      set(changedTasks) {
        // updateCard(changedTasks); //call method to emit to parent - check parameter
        this.$store.dispatch({ type: "updateTasks", tasks: changedTasks, cardId: this.card._id });
      }
    },
    dragOptions () {
      return  {
        ghostClass: 'ghost'
      }
    }
  },
  methods: {
    isFilter() {
      return !this.$store.getters.getFilter.byLabel;
    },
    isMoveEnabled: function() {
      return (!!this.isFilter() && !!this.$store.getters.getCurrUser)
    },
    removeTask(task) {
      this.$emit('removeTask', task)
    },
    updateCard(updatedCard) {
      console.log('card before emit from prev to list',updatedCard)
      this.$emit('updateCard', updatedCard)
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
div .ghost {
  opacity: .2;
}
</style>

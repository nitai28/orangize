<template>
    <section class="card-preview">
        <draggable v-model="listItems" class="dragArea" :options="{group:'listItems'}">
            <li v-for="item in listItems" :key="item._id">
            <router-link :to="'/orangize/'+item._id">
                <task-preview :task="item"></task-preview>
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
  props: ["list", "items"],
  computed: {
    listItems: {
      get() {
        return this.items;
      },
      set(changedItems) {
        this.$store.dispatch({
          type: "updateItems",
          items: changedItems,
          listId: this.list._id
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

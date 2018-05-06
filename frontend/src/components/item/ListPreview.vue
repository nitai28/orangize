<template>
    <section class="list-item">
        <draggable v-model="listItems" class="dragArea" :options="{group:'listItems'}">
            <li v-for="item in listItems" :key="item._id">
            <router-link :to="'/orangize/'+item._id">
                <item-preview :item="item"></item-preview>
            </router-link> 
            </li>
        </draggable>
    </section>
</template>

<script>
import ItemPreview from "./ItemPreview.vue";
import Draggable from "vuedraggable";

export default {
  name: "ListPreview",
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
    ItemPreview
  }
};
</script>

<style>
.dragArea {
  min-height: 10px;
}
</style>

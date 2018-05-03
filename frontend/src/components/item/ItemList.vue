<template>
    <section class="item-list">
          <ul class="clean-list">
              <li class="item-preview" v-for="item in items" :key="item._id">
                <div>
                  {{item.title}} | {{ item.labels }} | Deadline: {{ item.deadline }}
                </div>
                <!-- {{ item }} -->
                  <!-- <todo-item :currTodo="todo"></todo-item> -->
              </li>
              <li class="new-item item-preview">
                <div>
                  Create item...
                </div>
              </li>
          </ul>
    </section>
</template>
{
        _id: "5ae9c24dafaf4a13784ba582",
        title: "chen",
        users: [],
        labels: [],
        desc: "This is a Item #5!",
        comments: [],
        deadline: "Date.now()",
        isDone: false
      };
<script>
import ItemService from "../../services/ItemService.js";

export default {
  created() {
    
    this.$store.dispatch({ type: "loadItems" });
  },
  computed: {
    items() {
      return this.$store.getters.getItems;
    }
  },
  components: {
    // ItemItem,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-preview {
  background-color: red;
  margin: 2px;
}
.new-item {
  background-color: rgba(146, 255, 57, 0.5)
}
</style>

<template>
    <section class="todo-list">
          <ul class="clean-list">
              <li v-for="todo in todos" :key="todo.id" :class="{ done: todo.isDone }">
                  <todo-item :currTodo="todo"></todo-item>
              </li>
          </ul>
    </section>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  created() {
    this.$store.dispatch({ type: "loadTodos" });
  },
  computed: {
    todos() {
      return this.$store.getters.getTodos;
    }
  },
  components: {
    TodoItem,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  display: inline-block;
  width: 200px;
}
.done {
        text-decoration: line-through;
        background-color: #666666;
        color: lightgray;
    }
</style>

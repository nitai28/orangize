<template>
  <section class="todo-search">
      <el-input class="search" prefix-icon="el-icon-search" placeholder="Search todos.." @input="setFilterBySearch" clearable></el-input>
  </section>
</template>

<script>
export default {
  methods: {
    setFilterBySearch(input) {
      this.$store.commit({ type: "setFilterBySearch", todoName: input });
      this.$store.dispatch({ type: "loadTodos" });
    }
  },
}
</script>

<style>
    .todo-search {
        width: 170px;
    }
</style>

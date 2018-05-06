<template>
  <section class='task-filter'>
    <h2> Filter </h2>
    <select :class='filter.byLabel' v-model='filter.byLabel' @change='emitFilter()'>
        <option class='all' value=''>No Filter</option>
        <option class='red' value='red'></option>
        <option class='orange' value='orange'></option>
        <option class='yellow' value='yellow'></option>
        <option class='green' value='green'></option>
    </select>
    <input type='search' v-model="filter.byTitle" placeholder='Filter by title' @input="filterBySearch" />
  </section>
</template>

<script>
var debounce = require("debounce");

export default {
  name: "TaskFilter",
  data() {
    return {
      filter: { byLabel: "", byTitle: "" }
    };
  },
  methods: {
    emitFilter() {
      let copyFilter = Object.assign({}, this.filter);
      console.log(copyFilter);
      this.$store.commit({ type: "setFilter", filter: copyFilter });
    },
    filterBySearch: debounce(function (e) {
     this.emitFilter()
    }, 500)
  },
};
</script>

<style>
.all {
  background: white;
}
.red {
  background: rgb(197, 0, 0);
}
.yellow {
  background: rgb(240, 224, 5);
}
.green {
  background: rgb(35, 149, 7);
}
.orange {
  background: rgb(255, 174, 0);
}
</style>

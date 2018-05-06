<template>
  <section class='task-filter'>
    <select :class='filter.byLabel' v-model='filter.byLabel' @change='emitFilter()'>
        <option class='all' value=''>No Filter</option>
        <option class='red' value='red'></option>
        <option class='orange' value='orange'></option>
        <option class='yellow' value='yellow'></option>
        <option class='green' value='green'></option>
    </select>
  </section>
</template>

<script>
export default {
    data() {
        return {
            filter: {byLabel: '', byTitle: ''}
        }
    },
    methods: {
        emitFilter() {
            let copyFilter = Object.assign({}, this.filter);
            this.$store.commit({type: 'setFilter', filter: copyFilter});
        }
    }
}
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

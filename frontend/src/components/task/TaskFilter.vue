<template>
  <section class="task-filter">
    <select v-model="filter.byLabel" @change="emitFilter()">
        <option>red</option>
        <option>orange</option>
        <option>blue</option>
        <option>green</option>
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
            this.$emit('filterChanged', this.filter);
        }
    }
}
</script>

<style>

</style>

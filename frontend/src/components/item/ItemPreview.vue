<template>
    <!-- <section @click="showDetails(item)"> -->
    <section>
        <h3>{{ item.title }}</h3>
        <div>{{ item.labels }}</div>
        <button @click.stop="removeItem(item)">X</button>
    </section>
</template>

<script>
export default {
  name: "ItemPreview",
  props: ["item"],
  methods: {
    // showDetails(item) {
    //   this.$store.commit({type: 'setSelectedItem', item});
    // },
    removeItem(item) {
      this.$store.dispatch({ type: 'removeItem', item});
    }
  }
};
</script>

<style>
  h3 {
    padding: 5px;
    background-color: #eae7e7f0;
  }
</style>

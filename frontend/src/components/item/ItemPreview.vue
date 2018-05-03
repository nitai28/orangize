<template>
    <section @click="showDetails(item._id)">
        <h3>{{ item.title }}</h3>
        <div>{{ item.labels }}</div>
    </section>
</template>

<script>
export default {
  name: "ItemPreview",
  props: ["item"],
  methods: {
    showDetails(itemId) {
      this.$emit("showDetails", itemId);
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

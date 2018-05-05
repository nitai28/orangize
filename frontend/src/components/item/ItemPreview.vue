<template>
    <section class="item-prev-container" @click="showDetails(item)">
    <!-- <section> -->
        <h3>{{ item.title }}</h3>
        <div v-show="item.lables">{{ item.labels }}</div>
        <button class="delete-item" @click.stop="removeItem(item)">X</button>
    </section>
</template>

<script>
export default {
  name: "ItemPreview",
  props: ["item"],
  methods: {
    showDetails(item) {
      this.$store.commit({type: 'setSelectedItem', item});
    },
    removeItem(item) {
      this.$store.dispatch({ type: 'removeItem', item});
    }
  }
};
</script>

<style scoped>
.item-prev-container {
  display: flex;
  flex-direction: row;
}

h3 {
  padding: 5px;
  background-color: #eae7e7f0;
  display: inline-block;
  border-radius: 5%;
}

.delete-item {
  display: inline-block;
}
</style>

<template>
    <section :class="{[item.label]: (item.label) }" @click="showDetails(item)">
    <!-- <section> -->
        <h3>{{ item.title }}</h3>
        <!-- <div>{{ item.labels }}</div> -->
        <button @click.stop="removeItem(item)">X</button>
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
  },
  computed:{
    label(){
      console.log(this.item.labels[0]);
      
      return this.item.labels[0]
    }
  }
};
</script>

<style>
  h3 {
    padding: 5px;
    background-color: #eae7e7f0;
  }
.red {
  background: red;
}
.yellow {
  background: yellow;
}
.green {
  background: green;
}
.blue {
  background: blue;
}
</style>

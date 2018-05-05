<template>
    <section class="item-prev-container" :class="{[item.label]: (item.label) }" @click="showDetails(item)">
    <!-- <section> -->
        <h3>{{ item.title }}</h3>
        <!-- <div>{{ item.labels }}</div> -->
         <div v-show="item.labels">{{ item.labels }}</div>
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
  },
  computed:{
    label(){
      console.log(this.item.labels[0]);
      
      return this.item.labels[0]
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

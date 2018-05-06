<template>
    <section class="item-prev-container" :class="{[item.label]: (item.label) }" @click="showDetails(item)">
        <h3>{{ item.title }}</h3>
        <button class="delete-item" @click.stop="removeItem(item)"><img src="../../assets/icon/rubbish-bin.svg" /></button>
    </section>
</template>

<script>
import EventBusService from '../../services/EventBusService';
export default {
  name: "ItemPreview",
  props: ["item"],
  methods: {
    showDetails(item) {
      EventBusService.$emit('openModal');
      this.$store.commit({type: 'setSelectedItem', item});
    },
    removeItem(item) {
      this.$store.dispatch({ type: 'removeItem', item});
    }
  },
  computed:{
    label(){
      return this.item.labels[0]
    }
  }
};
</script>

<style scoped>
.item-prev-container {
  display: flex;
  flex-direction: row;
  background-color: #eae7e7f0;
}

h3 {
  width: 100%;
  padding: 5px;
  display: inline-block;
  border-radius: 5%;
}

.delete-item {
  display: inline-block;
  opacity: 0;
  transition: opacity .3s ease-in-out;
}

.delete-item img {
  width: 15px;
  height: 15px;
}

.delete-item:hover {
  opacity: 1;
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

<template>
    <section class="item-list">
          <ul class="clean-list"> 
             <li class="item-preview" v-for="item in list.items" :key="item._id">
                <router-link :to="'/orangize/'+item._id">
                  <item-preview :list="list" :item="item" ></item-preview>
                </router-link>
              </li>
              <li class="new-item item-preview">
                <div>
                  Create item...
                </div>
              </li>
          </ul>
    </section>
</template>

<script>
import ItemService from "../../services/ItemService.js";
import ItemPreview from './ItemPreview.vue';

export default {
  props: ['list'],
  created() {
    
    // this.$store.dispatch({ type: "loadItems" });
  },
  computed: {
    items() {
      return this.$store.getters.getItems;
    }
  },
  components: {
    ItemPreview,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-preview {
  background-color: red;
  margin: 2px;
}
.new-item {
  background-color: rgba(146, 255, 57, 0.5)
}
</style>

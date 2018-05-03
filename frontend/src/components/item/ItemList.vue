<template>
    <section class="item-list">
        <ul>
          <li v-for="list in lists" :key="list._id">
            <h3>{{list.title}}</h3>
            <ul class="clean-list"> 
             <li class="item-preview" v-for="item in list.items" :key="item._id">
                <router-link :to="'orangize/'+item._id">
                  <item-preview :item="item" ></item-preview>
                </router-link>
              </li>
              <li class="new-item item-preview" @click="createItem(list)">
                  Create item...
              </li>
            </ul>
          </li>
        </ul>
          
    </section>
</template>

<script>
// import ItemService from "../../services/ItemService.js";
import ItemPreview from "./ItemPreview.vue";

export default {
  created() {
    this.$store.dispatch({ type: "loadLists" });
  },
  computed: {
    lists() {
      return this.$store.getters.getLists;
    }
  },
  methods: {
    createItem(list) {
      this.$store.dispatch({type: "createItem",list: list});
    }
  },
  components: {
    ItemPreview
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-preview {
  background-color: red;
  margin: 2px;
}
.new-item {
  background-color: rgba(146, 255, 57, 0.5);
}
</style>

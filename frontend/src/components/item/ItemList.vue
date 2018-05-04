<template>
    <section class="item-list">
      <ul>
        <li v-for="list in lists" :key="list._id">
          <h3>{{list.title}}</h3>
          <ul class="clean-list">
            <li class="item-preview toggle-modal"  v-for="item in list.items" :key="item._id">
              <router-link :to="'/orangize/'+item._id">
                <item-preview :item="item" ></item-preview>
              </router-link>
            </li>
            <li class="new-item item-preview" @click="createItem(list)">
                Create item...
            </li>
          </ul>
          </li>
      </ul>
      <div class="item-modal">
        <item-modal :activated="modalActive"></item-modal>
      </div>
    </section>
</template>

<script>
// import ItemService from "../../services/ItemService.js";
import ItemPreview from "./ItemPreview.vue";
import ItemModal from "./ItemModal.vue";

export default {
  created() {
    this.$store.dispatch({ type: "loadLists" });
  },
  data() {
    return {
      modalActive: false
    };
  },
  computed: {
    lists() {
      return this.$store.getters.getLists;
    }
  },
  methods: {
    createItem(list) {
      this.$store.dispatch({ type: "createItem", list: list });
    },
    toggleModal() {
      this.modalActive = !this.modalActive;
    }
  },
  components: {
    ItemPreview,
    ItemModal
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-preview {
  background-color: rgba(155, 153, 153, 0.904);
  margin: 2px;
}
.new-item {
  background-color: rgba(146, 255, 57, 0.5);
}
</style>
// @click="toggleModal"
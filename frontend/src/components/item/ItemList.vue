<template>
    <section class="item-list">
          <ul class="clean-list"> 
             <li class="item-preview toggle-modal" @click="toggleModal" v-for="item in list.items" :key="item._id">
               <!-- <router-link :to="'orangize/'+item._id"> -->
                  <item-preview :item="item"></item-preview>
                <!-- </router-link> -->
              </li>
              <li class="new-item item-preview">
                <div>
                  Create item...
                </div>
              </li>
          </ul>


<div class="item-modal">
  <item-modal :activated="modalActive"></item-modal>
</div>

    </section>
</template>

<script>
import ItemService from "../../services/ItemService.js";
import ItemPreview from './ItemPreview.vue';
import ItemModal from './ItemModal.vue'

export default {
  props: ['list'],
  created() {
    
    this.$store.dispatch({ type: "loadItems" });
  },
  

    data() {
      return {
        modalActive: false
      };
    },
    methods: {
      toggleModal() {
        this.modalActive = !this.modalActive;
      }
    },
  computed: {
    items() {
      return this.$store.getters.getItems;
    }
  },
  components: {
    ItemPreview,
    ItemModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-preview {
  background-color: rgba(155, 153, 153, 0.904);
  margin: 2px;
}
.new-item {
  background-color: rgba(146, 255, 57, 0.5)
}
</style>


<template>
    <section class='orangize-app'>
        <i class="orangize"></i> <h1>Orangize</h1>
        <item-list></item-list>
        <!-- <item-details v-if="selectedItem" :item="selectedItem" ></item-details> -->
    </section>
</template>

<script>

import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import itemDetails from '../components/item/ItemDetails.vue'
import ItemList from '../components/item/ItemList.vue';
import ListService from '../services/ListService.js'
import SocketSerivce from '../services/SocketService.js'
// import ItemList from '../components/list/List.vue';

export default {
  name: 'OrangizeApp',
  data() {
    return {
    };
  },
  created() {
    SocketSerivce.connectSocket(); 
  },
  methods: {
   
  },
  computed: {
    showDetails() {
      console.log('id of item to show',this.$route.params.id)
      return this.$route.params.id
    },
    // selectedItem(){
    //   console.log('sadsadsad',this.$store.getters.selectedItem);
      
    //   return this.$store.getters.selectedItem
    // }
    
  },
  components: {
    ItemList,
    // itemDetails
  }
};
</script>

<style scoped>
  .orangize {
    display: inline-block;
    background-image: url('../assets/icon/orange.svg');
    width: 30px;
    height: 30px;
  }
  h1 {
    display: inline-block; 
  }
</style>
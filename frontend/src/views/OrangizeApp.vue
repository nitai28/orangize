
<template>
    <section class='orangize-app'>
        <h1>Orangize</h1>
        <item-list></item-list>
        <!-- <item-details v-if="showDetails"></item-details> -->
    </section>
</template>

<script>

import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import itemDetails from '../components/item/ItemDetails.vue'
import ItemList from '../components/item/ItemList.vue';
import ListService from '../services/ListService.js'
// import ItemList from '../components/list/List.vue';

export default {
  name: 'OrangizeApp',
  data() {
    return {
    };
  },
  created() {
    // axios.get(`${BASE_URL}/list`).then(res => {
    //   console.log('LISTS', res.data);
    //   this.lists = res.data;
    // });
  },
  methods: {
    // add() {
    //   axios.post(`${BASE_URL}/dog`, { name: 'New Dog' }).then(res => {
    //     console.log('NEW DOG', res.data);
    //   });
    // }
  },
  computed: {
    showDetails() {
      console.log('id of item to show',this.$route.params.id)
      return this.$route.params.id
    },
  },
  components: {
    ItemList,
    itemDetails
  }
};
</script>

<style>

</style>
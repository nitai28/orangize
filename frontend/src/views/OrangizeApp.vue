
<template>
    <section class='orangize-app'>
        <h1>Orangize</h1>
        <ul>
          <li v-for="list in lists" :key="list._id">
            <item-list :list="list"></item-list>
          </li>
        </ul>
        <item-details :item="selectedItem" v-if="selectedItem"></item-details>
    </section>
</template>

<script>

import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import itemDetails from '../components/item/ItemDetails.vue'
import ItemList from '../components/item/ItemList.vue';
import ListService from '../services/ListService.js'

export default {
  name: 'OrangizeApp',
  data() {
    return {
      lists: []
    };
  },
  created() {
    // axios.get(`${BASE_URL}/list`).then(res => {
    //   console.log('LISTS', res.data);
    //   this.lists = res.data;
    // });
    ListService.getLists().then(lists => {
      this.lists = lists
    })
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
    selectedItem() {
      return this.$store.getters.getSelectedItem;
    }
  },
  components: {
    ItemList,
    itemDetails
  }
};
</script>

<style>

</style>
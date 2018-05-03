
<template>
    <section class='orangize-app'>
        <h1>Orangize</h1>
        <item-list></item-list>
    </section>
</template>

<script>

import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import axios from 'axios';
const BASE_URL = 'localhost:3000'
import itemDetails from '../components/item/ItemDetails'
import ItemList from '../components/item/ItemList.vue';

export default {
  name: 'OrangizeApp',
  data() {
    return {
    };
  },
  created() {
    // axios.get(`${BASE_URL}/dog`).then(res => {
    //   console.log('DOGS', res.data);
    //   this.dogs = res.data;
    // });
  },
  methods: {
    // add() {
    //   axios.post(`${BASE_URL}/dog`, { name: 'New Dog' }).then(res => {
    //     console.log('NEW DOG', res.data);
    //   });
    // }
  },
  computed: {},
  components: {
    ItemList
  }
};
</script>

<style>

</style>
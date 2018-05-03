
<template>
    <section class="orangize-app">
        <item-details></item-details>
    </section>
</template>

<script>

import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import axios from 'axios';
const BASE_URL = 'localhost:3000'
import itemDetails from '../components/item/ItemDetails'

export default {
  name: "OrangizeApp",
  data() {
    return {
      dogs: []
    };
  },
  created() {
    axios.get(`${BASE_URL}/dog`).then(res => {
      console.log("DOGS", res.data);
      this.dogs = res.data;
    });
  },
  methods: {
    add() {
      axios.post(`${BASE_URL}/dog`, { name: "New Dog" }).then(res => {
        console.log("NEW DOG", res.data);
      });
    }
  },
  computed: {},
  components:{
    itemDetails
  }
};
</script>

<style>

</style>
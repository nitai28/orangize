<template>
    <section class="orangize-app">
        <h1>DOGS for User</h1>
          {{dogs.length}} Dogs
        <button @click="add">ADD</button>
    </section>
</template>

<script>

import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";
import axios from 'axios';
const BASE_URL = 'localhost:3000'

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
  computed: {}
};
</script>

<style>

</style>
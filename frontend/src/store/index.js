import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import UserStore from './UserStore.js'
import CardStore from './CardStore.js'

export default new Vuex.Store({
  strict: true,
  state: {
    
  },
  modules: {
    UserStore,
    CardStore
  }
  
})



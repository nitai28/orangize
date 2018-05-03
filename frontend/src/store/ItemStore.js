import ItemService from "../services/ItemService.js";

export default {
  strict: true,
  state: {
    // todosFilter: {
    //   byStatus: 'All',
    //   bySearch: ''
    // },
    items: [],
    itemToShow: null,
    selectedItem: null
    // user: {
    //   userName: '',
    //   actions: [{
    //     name: '',
    //     at: 0
    //   }]
    // },
  },
  mutations: {
    setItems(state, { items }) {
      console.log("STORE: Items has been loaded.");
      state.items = items;
    },
    setSelectedItem(state, {item}) {
      state.selectedItem = item;
    }

  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getSelectedItem(state) {
      return state.selectedItem;
    }


  },
  actions: {
    loadItems(store) {
      console.log("STORE: Loading items.");
      // store.state.ItemFilter
      return ItemService.query().then(items => {
        store.commit({ type: "setItems", items });
      });
    }
 
  },
  addComment(store,{item}){
      ItemService.updateComment(item)
    // store.commit({type:"updateComment",item})
  }
};

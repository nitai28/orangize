import ItemService from "../services/ItemService.js";
import ListService from "../services/ListService.js";

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

  },
  mutations: {
    setLists(state, { items }) {
      console.log("STORE: Items has been loaded.");
      state.items = items;
    },
    setSelectedItem(state, {item}) {
      state.selectedItem = item;
    }

  },
  getters: {
    getLists(state) {
      return state.items;
    },
    getSelectedItem(state) {
      return state.selectedItem;
    }


  },
  actions: {
    loadLists(store) {
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

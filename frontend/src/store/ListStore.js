import ItemService from "../services/ItemService.js";
import ListService from "../services/ListService.js";

export default {
  strict: true,
  state: {

    lists: [],
    itemToShow: null,

  },
  mutations: {
    setItems(state, { items }) {
      console.log("STORE: Items has been loaded.");
      state.items = items;
    },
    setLists(state, { lists }) {
      state.lists = lists;
      console.log("STORE: Lists has been loaded.");
    },
    updateList(state, {updatedList}) {
      console.log
      const listIdx = state.lists.findIndex(list => list._id === updatedList._id);
      state.lists.splice(listIdx, 1, updatedList);
    }
  },
  actions: {
    loadLists(store) {
      console.log('STORE: LOADING LISTS...');
      return ListService.getLists()
      .then(lists => store.commit({ type: 'setLists', lists }))
      .catch(err => err);
    },
    loadItems(store) {
      console.log("STORE: Loading items.");
      // store.state.ItemFilter
      return ItemService.query().then(items => {
        store.commit({ type: "setItems", items });
      });
    },
    createItem(store, {list}) {
      var editedList = JSON.parse(JSON.stringify(list));
      editedList.items.push(ItemService.emptyItem());
      ListService.saveList(editedList).then(_ => {
        store.commit({type: 'updateList', updatedList: editedList});
      })
    }
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getLists(state) {
      console.log(state.lists);
      return state.lists;
    }

  },
};

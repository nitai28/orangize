import ItemService from "../services/ItemService.js";
import ListService from "../services/ListService.js";

export default {
  strict: true,
  state: {
    lists: [],
    itemToShow: null,
    selectedItem: null
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
    updateList(state, { updatedList }) {
      const listIdx = state.lists.findIndex(
        list => list._id === updatedList._id
      );
      state.lists.splice(listIdx, 1, updatedList);
    },
    setSelectedItem(state, { item }) {
      state.selectedItem = item;
    }
,
    newList(state, {newList}) {
      state.lists.push(newList);
      console.log('new list:', newList)
    },
    deleteList(state, {listId}) {
      console.log('id to delete', listId)
      const listIdx = state.lists.findIndex(list => list._id === listId);
      state.lists.splice(listIdx, 1);
    }
  },
  actions: {
    loadLists(store) {
      return ListService.getLists()
        .then(lists => store.commit({ type: "setLists", lists }))
        .catch(err => err);
    },
    loadItems(store) {
      return ItemService.query().then(items => {
        store.commit({ type: "setItems", items });
      });
    },

    createItem(store, { list }) {
      var editedList = JSON.parse(JSON.stringify(list));
      editedList.items.push(ItemService.emptyItem(list._id));
      ListService.saveList(editedList).then(_ => {
        store.commit({ type: "updateList", updatedList: editedList });
      });
    },
    updateItem(store, { editedItem }) {
      ListService.getListById(editedItem.listId).then(list => {
        let itemIdx = list.items.findIndex(item => {
          console.log(item._id, editedItem._id);
          
          return item._id === editedItem._id
        });
        list.items.splice(itemIdx, 1, editedItem);
        
        ListService.saveList(list).then(_ => {
          store.commit({ type: "updateList", updatedList: list });
          store.commit({ type: "setSelectedItem", item: list.items[itemIdx] });
        });
      });
    },
    addList(store) {
      var createdList = ListService.emptyList();
      ListService.saveList(createdList).then((newList) => {
        store.commit({type: 'newList', newList})
      })
    },
    deleteList(store, {listId}) {
      ListService.deleteList(listId).then(() => {
        console.log('list deleted')
        store.commit({ listId, type: 'deleteList'})
      })
    },
    removeItem(store, {item}) {
      ListService.getListById(item.listId)
      .then(list => {
        console.log('list items BEFORE', list.items)
        list.items = list.items.filter(currItem => currItem._id !== item._id);
        ListService.saveList(list).then(_ => {
          store.commit({type: 'updateList', updatedList: list});
        })
        console.log('list items AFTER', list.items);
      })
    },
    updateList(store, {updatedList}) {
      ListService.saveList(updatedList)
      .then(() => {
        store.commit({type: 'updateList', updatedList});
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
    },
    selectedItem(state) {
      return state.selectedItem;
    }
  }
};

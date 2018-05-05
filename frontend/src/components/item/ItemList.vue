<template>
    <section class="item-list">
      <button @click="addList">Add List</button>
      <ul class="flex flex-row">
        <draggable v-model="lists" class="flex flex-row clean-list">
        <li class="list-container" v-for="list in lists" :key="list._id">
          <div class="list-title">
            <h3 v-show="editableListId !== list._id" @dblclick="editTitle(list)">{{list.title}}</h3>
            <input v-show="editableListId === list._id" v-model="currList.title" 
                   @blur="editableListId=null; updateListTitle(currList)"
                   @keyup.enter="editableListId=null; updateListTitle(currList)">
            <img src="../../assets/icon/rubbish-bin.svg" class="delete-list" @click="deleteList(list._id)">
          </div>
          <ul class="clean-list items-container">
            <draggable v-model="list.items" class="dragArea" :options="{group:'listItems'}" @change="checkMove($event, list)">
              <li class="item-preview toggle-modal" @click="toggleModal" v-for="item in list.items" :key="item._id" @move="updated(item, list.items, item._id)">
                <router-link :to="'/orangize/'+item._id">
                  <item-preview :item="item" ></item-preview>
                </router-link> 
              </li>
            </draggable>
            <li class="new-item item-preview" @click="createItem(list)">
                Create item...
            </li>
          </ul>
          </li>
          </draggable>
      </ul>
      <div class="item-modal">
        <item-modal :activated="modalActive"><item-details class="item-details" v-if="selectedItem" :item="selectedItem"></item-details></item-modal>
      </div>
    </section>
</template>

<script>
// import ItemService from "../../services/ItemService.js";
import ItemPreview from "./ItemPreview.vue";
import ItemModal from "./ItemModal.vue";
import ItemDetails from "./ItemDetails.vue";
import Draggable from 'vuedraggable';

export default {
  created() {
    this.$store.dispatch({ type: "loadLists" });
  },
  data() {
    return {
      modalActive: false,
      editableListId: null,
      currList: {}
    };
  },
  computed: {
     selectedItem(){
      return this.$store.getters.selectedItem
     },
    lists: {
      get() {
        return this.$store.getters.getLists;
      },
      set(value) {
        this.$store.dispatch({type: 'updateListsOrder', lists: value})
      }
    },
  },
  watch: {

  },
  methods: {
    checkMove(ev, list) {
    // if(ev.added) {
      this.$store.dispatch({type: 'updateList', updatedList: list})
      // list.items
    // }
    // else if(ev.removed) {

    // }
    // console.log('ev', ev.added);
    // console.log('list', list);
  },
    createItem(list) {
      this.$store.dispatch({ type: "createItem", list });
    },
    toggleModal() {
      console.log('LALALALALAALLALA')
      this.modalActive = !this.modalActive;
    },
    addList() {
      this.$store.dispatch({ type: "addList" });
    },
    deleteList(listId) {
      this.$store.dispatch({ type: "deleteList", listId });
    },
    updateListTitle(updatedList) {
      this.$store.dispatch({ type: "updateList", updatedList });
    },
    editTitle(list) {
      // this.$refs.titleInput.focus();
      this.editableListId = list._id;
      this.currList = JSON.parse(JSON.stringify(list));
    }
  },
  components: {
    ItemPreview,
    ItemModal,
    ItemDetails,
    Draggable
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-tasks {
  min-width: 200px;
  background-color: #c7c7c7f0;
  margin: 5px;
  border-radius: 5%;
}

.item-preview {
  /* background-color: rgba(240, 240, 240, 0.904); */
  border-radius: 5%;
  width: 100%;
  transition: width 0.5s ease-in-out;
}

.new-item {
  background-color: rgba(237, 143, 33, 0.75);
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
}

.list-container {
  margin: 10px;
  padding: 5px;
  /* background-color: #c7c7c7f0; */
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.list-title {
  width: 100%;
  display: inline-block;
  padding: 5px;
  align-self: flex-start;
  /* background-color: #eae7e7f0; */
}

.list-title h3 {
  display: inline-block;
  width: 85%;
}

.delete-list {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-left: 10px;
}

.items-container {
  width: 100%;
}
</style>

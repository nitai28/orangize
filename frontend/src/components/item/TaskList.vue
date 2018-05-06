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
            <list-item :list="list" :items="list.items"></list-item>
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
import EventBusService from '../../services/EventBusService';
import ItemPreview from "./ItemPreview.vue";
import ItemModal from "./ItemModal.vue";
import ItemDetails from "./ItemDetails.vue";
import ListItem from './ListItem.vue';
import Draggable from "vuedraggable";

export default {
  created() {
    this.$store.dispatch({ type: "loadLists" });
    EventBusService.$on('openModal', this.toggleModal);
  },
  data() {
    return {
      modalActive: false,
      editableListId: null,
      currList: {}
    };
  },
  computed: {
    selectedItem() {
      return this.$store.getters.selectedItem;
    },
    lists: {
      get() {
        return this.$store.getters.getLists;
      },
      set(value) {
        this.$store.dispatch({ type: "updateListsOrder", lists: value });
      }
    }
  },

  methods: {
    createItem(list) {
      this.$store.dispatch({ type: "createItem", list });
    },
    toggleModal() {
      console.log("LALALALALAALLALA");
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
    Draggable,
    ListItem
  }
};
</script>

<style scoped>
.list-tasks {
  min-width: 200px;
  background-color: #c7c7c7f0;
  margin: 5px;
  border-radius: 5%;
}

.new-item {
  background-color: rgba(237, 143, 33, 0.75);
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
  margin-top: 5px;

}

.list-container {
  margin: 10px;
  padding: 5px;
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

.items-details {
    height: 90%;
    width: 90%;
    margin: auto;
    margin-top: 40px;
}


</style>

<template>
    <section class="item-list">
      <button @click="addList">Add List</button>
      <ul class="flex flex-row">
        <li v-for="list in lists" :key="list._id">
          <div class="list-title">
            
            <h3 v-show="editableListId !== list._id" @dblclick="editTitle(list)">{{list.title}}</h3>
            <input v-show="editableListId === list._id" v-model="currList.title" 
                   @blur="editableListId=null; updateListTitle(currList)"
                   @keyup.enter="editableListId=null; updateListTitle(currList)">
            <img src="../../assets/icon/rubbish-bin.svg" class="delete-list" @click="deleteList(list._id)">
          </div>
          <ul class="clean-list">
            <li class="item-preview toggle-modal" @click="toggleModal" v-for="item in list.items" :key="item._id">
              <router-link :to="'/orangize/'+item._id">
                <item-preview :item="item" ></item-preview>
              </router-link>
            </li>
            <li class="new-item item-preview" @click="createItem(list)">
                Create item...
            </li>
          </ul>
          </li>
      </ul>
      <div class="item-modal">
        <item-modal  :activated="modalActive"><item-details class="item-details" v-if="selectedItem" :item="selectedItem"></item-details></item-modal>
      </div>
    </section>
</template>

<script>
// import ItemService from "../../services/ItemService.js";
import ItemPreview from "./ItemPreview.vue";
import ItemModal from "./ItemModal.vue";
import ItemDetails from "./ItemDetails.vue";


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
    lists() {
      return this.$store.getters.getLists;
    },
     selectedItem(){
      console.log('sadsadsad',this.$store.getters.selectedItem);
      
      return this.$store.getters.selectedItem
    }
  },
  methods: {
    createItem(list) {
      this.$store.dispatch({ type: "createItem", list });
    },
    toggleModal() {
      this.modalActive = !this.modalActive;
    },
    addList() {
      this.$store.dispatch({type: "addList"})
    },
    deleteList(listId) {
      this.$store.dispatch({type: "deleteList", listId})
    },
    updateListTitle(updatedList) {
      this.$store.dispatch({type: "updateList", updatedList})
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
    ItemDetails
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-preview {
  background-color: rgba(155, 153, 153, 0.904);
  margin: 2px;
}
.new-item {
  background-color: rgba(146, 255, 57, 0.5);
}

.list-title {
  display: inline-block
}

.list-title {
  background-color: #eae7e7f0;
}

.list-title h3 {
  display: inline-block
}

.delete-list {
  display: inline-block;
  width: 15px;
  height: 15px;
}


</style>
// @click="toggleModal"
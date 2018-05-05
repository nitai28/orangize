<template>
    <section class="item-list">
      <button @click="addList">Add List</button>
      <ul class="flex flex-row">
        <li  class="list-tasks" v-for="list in lists" :key="list._id">
          <div class="list-title-container">
            <div class="list-title">
              <h3    v-show="editableListId !== list._id" @dblclick="editTitle(list)">{{list.title}}</h3>
              <input v-show="editableListId === list._id" v-model="currList.title" 
                    @blur="editableListId=null; updateListTitle(currList)"
                    @keyup.enter="editableListId=null; updateListTitle(currList)">
            </div>
            <div class="delete-list">
              <img src="../../assets/icon/rubbish-bin.svg" @click="deleteList(list._id)">
            </div>
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
        <item-modal :activated="modalActive"></item-modal>
      </div>
    </section>
</template>

<script>
// import ItemService from "../../services/ItemService.js";
import ItemPreview from "./ItemPreview.vue";
import ItemModal from "./ItemModal.vue";

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
    ItemModal
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
  margin: 2px;
  border-radius: 5%;
  width: 100px;
  transition: width .5s ease-in-out;
}

.new-item {
  background-color: rgba(146, 255, 57, 0.5);
  width: fit-content;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
}

.list-title-container {
  background-color: #c7c7c7f0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.list-title {
  padding: 5px;
  align-self: flex-start;
  display: inline-block;
}

.delete-list img {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  padding: 5px;
}

</style>

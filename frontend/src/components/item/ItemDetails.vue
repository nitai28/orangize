<template>
    <section class="flex flex-column ">
      <h3 v-show="isTitleEditMode === false" @dblclick="isTitleEditMode = true">{{editedItem.title}}</h3>
      <input v-show="isTitleEditMode === true" v-model="editedItem.title"
             @blur="isTitleEditMode=false; updateItem()"
             @keyup.enter="isTitleEditMode=false" autofocus>
      
      <label for="">Label LIst:</label>
      <div class="flex label-containe">
        <div @click.stop="updateLabel('red')" class="color red"></div>
        <div @click.stop="updateLabel('yellow')" class="color yellow"></div>
        <div @click.stop="updateLabel('green')" class="color green"></div>
        <div @click.stop="updateLabel('blue')" class="color blue"></div>
      </div>

      <!-- <select name="" id="">
        <option  value="" v-for="label in editedItem.labels" :key="label" >{{label}}</option>
      </select> -->
        <div>
          <h4>Comments List</h4>
          <hr>
          <ol>
            <li v-for="comment in editedItem.comments" :key="comment._id">{{comment.txt }} </li>
            <hr>
          </ol>
        </div>
         <textarea placeholder="Enter comment" contenteditable="true" name="" id="" cols="5" rows="5" v-model="addedComment.txt"></textarea>
        <button @click.stop="addComment">Add Comment</button>
    </section> 
</template>

<script>
import shortid from "shortid";
import ItemService from "../../services/ItemService.js";
export default {
  name: "ItemDetails",
  data() {
    return {
      addedComment: {},
      isTitleEditMode: false
    };
  },
  methods: {
    addComment() {
      this.editedItem.comments.unshift(this.addedComment);
      this.$store.dispatch({ type: "updateItem", editedItem: this.editedItem });
    },
    updateItem() {
      this.$store.dispatch({ type: "updateItem", editedItem: this.editedItem });
    },
    updateLabel(color) {
      this.editedItem.label = color;
      this.$store.dispatch({ type: "updateItem", editedItem: this.editedItem });
    }
  },
  computed: {
    editedItem() {
      this.addedComment = { _id: shortid.generate(), txt: "" };
      return JSON.parse(JSON.stringify(this.$store.getters.selectedItem));
    }
  }
};
components: {
}
</script>

<style scoped>
section {
  background: rgba(0, 0, 0, 0.575);
  color: rgb(255, 255, 255);
  /* text-align: center; */
}
h4 {
  text-decoration: underline;
}
.color {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 8px;
}
.red {
  background: red;
}
.yellow {
  background: yellow;
}
.green {
  background: green;
}
.blue {
  background: blue;
}
</style>

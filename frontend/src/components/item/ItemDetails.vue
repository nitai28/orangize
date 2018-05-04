

<template>
    <section class="flex flex-column ">
      <h3>{{editedItem.title}}</h3>
      <label for="">Label LIst:</label>
      <select name="" id="">
        <option  value="" v-for="label in editedItem.labels" :key="label" >{{label}}</option>
      </select>
        <div>
          <h4>Comments List</h4>
          <hr>
          <ol>
            <li v-for="comment in editedItem.comments" :key="comment._id">{{comment.txt }} </li>
            <hr>
          </ol>
        </div>
         <textarea placeholder="Enter comment" contenteditable="true" name="" id="" cols="5" rows="5" v-model="addedComment.txt"></textarea>
        <button @click="addComment">Add Comment</button>
        
    </section> 
</template>

<script>
import shortid from "shortid";
import ItemService from "../../services/ItemService.js";
export default {
  name: "ItemDetails",
  data() {
    return {
      addedComment: {}
    };
  },
  methods: {
    addComment() {
      this.editedItem.comments.unshift(this.addedComment);
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
  background: rgba(0, 0, 0, 0.329);
  color: rgb(40, 40, 212);
  width: 300px;
  text-align: center;
  margin: 0 auto;
}
h4 {
  text-decoration: underline;
}
</style>

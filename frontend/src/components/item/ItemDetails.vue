<template>
    <section class="details-container flex flex-column">
      <h3 v-show="isTitleEditMode === false" @dblclick="isTitleEditMode = true">{{editedItem.title}}</h3>
      <input v-show="isTitleEditMode === true" v-model="editedItem.title" @blur="isTitleEditMode=false; updateItem()"
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
          <ol>
            <li v-for="comment in editedItem.comments" :key="comment._id">{{comment.txt }} </li>
          </ol>
        </div>
         <textarea placeholder="Enter comment" contenteditable="true" name="" id="" cols="75" rows="10" v-model="addedComment.txt"></textarea>
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

.details-container {
  margin: 0 auto;
  margin-top: 50px;
  font-size: 1.5rem;
  font-family: 'Mina';
}

.details-container textarea {
  margin: 10px;
}

.color {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  border-radius: 8px;
}
.red {
  background: rgb(197, 0, 0);
}
.yellow {
  background: rgb(255, 136, 0);
}
.green {
  background: rgb(240, 224, 5);
}
.blue {
  background: rgb(35, 149, 7);
}
</style>

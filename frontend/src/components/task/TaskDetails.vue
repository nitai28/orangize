<template>
    <section class="task-details details-container flex flex-column">
      <h3 v-show="isTitleEditMode === false" @dblclick="isTitleEditMode = true">{{editedTask.title}}</h3>
      <input v-show="isTitleEditMode === true" v-model="editedTask.title" @blur="isTitleEditMode=false; updateTask()"
             @keyup.enter="isTitleEditMode=false" autofocus>
      
      <label for="">Label Card:</label>
      <div class="flex label-containe">
        <div @click.stop="updateLabel('red')" class="color red"></div>
        <div @click.stop="updateLabel('yellow')" class="color yellow"></div>
        <div @click.stop="updateLabel('green')" class="color green"></div>
        <div @click.stop="updateLabel('blue')" class="color blue"></div>
      </div>

      <!-- <select name="" id="">
        <option  value="" v-for="label in editedTask.labels" :key="label" >{{label}}</option>
      </select> -->
        <div>
          <h4>Comments Card</h4>
          <ol>
            <li v-for="comment in editedTask.comments" :key="comment._id">{{comment.txt }} </li>
          </ol>
        </div>
         <textarea placeholder="Enter comment" contenteditable="true" name="" id="" cols="75" rows="10" v-model="addedComment.txt"></textarea>
        <button @click.stop="addComment">Add Comment</button>
    </section> 
</template>

<script>
import shortid from "shortid";
import TaskService from "../../services/TaskService.js";
export default {
  name: "TaskDetails",
  data() {
    return {
      addedComment: {},
      isTitleEditMode: false
    };
  },
  methods: {
    addComment() {
      this.editedTask.comments.unshift(this.addedComment);
      this.$store.dispatch({ type: "updateTask", editedTask: this.editedTask });
    },
    updateTask() {
      this.$store.dispatch({ type: "updateTask", editedTask: this.editedTask });
    },
    updateLabel(color) {
      this.editedTask.label = color;
      this.$store.dispatch({ type: "updateTask", editedTask: this.editedTask });
    }
  },
  computed: {
    editedTask() {
      this.addedComment = { _id: shortid.generate(), txt: "" };
      return JSON.parse(JSON.stringify(this.$store.getters.selectedTask));
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

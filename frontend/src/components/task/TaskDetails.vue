<template>
    <section>
      <div class="task-details details-container flex">
        <div class="details1">
          <h3 v-show="isTitleEditMode === false" @dblclick="isTitleEditMode = true">{{editedTask.title}}</h3>
            <input class="title-edit" v-show="isTitleEditMode === true" v-model="editedTask.title" @blur="isTitleEditMode=false; updateTask()"
                  @keyup.enter="isTitleEditMode=false" autofocus>
          <label for="">Label Color:</label>
          <div class="color-container flex">
            <div @click.stop="updateLabel('red')" class="color red"></div>
            <div @click.stop="updateLabel('orange')" class="color orange"></div>
            <div @click.stop="updateLabel('yellow')" class="color yellow"></div>
            <div @click.stop="updateLabel('green')" class="color green"></div>
          </div>
          <h4>Task Members</h4>
              <div class="task-user-list">
                <ul class="add-member-list">
                  <li v-for="taskMember in taskMembers" :key="taskMember._id"><i @click.stop="deleteTaskMember(taskMember)" class="delete-icon"></i>{{taskMember.name}}
                    
                  </li>
                </ul>
              </div>
        </div>
          <div class="member-container">
            <div class="user-list-container">
              <h1 class="member-headline">member list</h1>
              <div class="user-list">
                <ul>
                  <li v-for="user in users" :key="user._id"><i @click="addUserToTaskMember(user)" class="user-icon"></i>{{user.name}} </li>
                </ul>
              </div>
            </div>
          </div>
            <div class="comments-container">
                <textarea placeholder="Enter comment" contenteditable="true" name="" id="" cols="75" rows="5" v-model="addedComment.txt"></textarea>
                <button class="add-comment" @click.stop="addComment">Add Comment</button>
                <div>
                  <h4>Comments</h4>
                  <ol>
                    <li class="comment-body" v-for="comment in editedTask.comments" :key="comment._id">{{comment.txt }} 
                      <p class="comment-by">Added By: <strong>{{comment.adddedBy}}</strong> {{comment.time | changeDateFilter}}</p>
                      <hr>
                    </li>
                  </ol>
                </div>
            </div>
        </div>
    </section> 
</template>

<script>
import shortid from "shortid";
const moment = require("moment");
export default {
  name: "TaskDetails",
  data() {
    return {
      userListOpen: false,
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
    },
    addUserToTaskMember(user) {
      this.$store.dispatch({
        type: "addUserToTaskMember",
        user,
        taskId: this.$route.params.id
      });
    },
    deleteTaskMember(user) {
      this.$store.dispatch({
        type: "deleteTaskMember",
        user,
        taskId: this.$route.params.id
      });
    }
  },
  computed: {
    editedTask() {
      let adddedBy = this.$store.getters.getCurrUser;
      this.addedComment = {
        _id: shortid.generate(),
        txt: "",
        adddedBy: adddedBy.name,
        time: Date.now()
      };
      return JSON.parse(JSON.stringify(this.$store.getters.selectedTask));
    },
    users() {
      return this.$store.getters.getUsers;
    },
    taskMembers() {
      return this.$store.getters.selectedTask.users;
    }
  },
  created() {
    this.$store.dispatch({ type: "loadUsers" });
  },
  filters: {
    changeDateFilter: function(value) {
      return moment(value).calendar();
    }
  }
};
components: {
}
</script>

<style scoped>
* {
  font-family: Dosis;
}
section {
  background: #f5f5f5;
  padding: 26px;
  border-radius: 8px;
  color: #231f20;
  width: 100%;
}
h4 {
  text-decoration: underline;
}
.details1 {
  flex-grow: 0.5;
  width: 50%;
}
.task-details{
      width: 58%;
}

.details-container {
  margin: 0 auto;
  height: fit-content;
  font-size: 1.5rem;
  font-family: "Mina";
  flex-wrap: wrap;
  width: 100%;
}
.user-icon {
  display: inline-block;
  background-image: url("../../assets/icon/user-plus.svg");
  background-position: cover;
  background-repeat: no-repeat;
  background-size: 30px;
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

.details-container textarea {
  margin: 10px 0;
  border-radius: 5px;
}

.add-comment {
  padding: 5px;
  border-radius: 5%;
}
.color {
  display: flex;
  width: 60px;
  height: 60px;
  margin-right: 5px;
  border-radius: 50%;
}
.color:hover {
  cursor: pointer;
  /* box-shadow: 0 0 50px rgba(33, 33, 33, 0.404); */
}
.red {
  background: rgb(197, 0, 0);
}
.yellow {
  background: rgb(240, 224, 5);
}
.green {
  background: rgb(35, 149, 7);
}
.orange {
  background: rgb(255, 174, 0);
}
.red:hover {
  background: rgb(160, 2, 2);
}
.yellow:hover {
  background: rgb(226, 212, 18);
}
.green:hover {
  background: rgb(28, 117, 6);
}
.orange:hover {
  background: rgb(223, 152, 0);
}
.delete-icon {
 display: inline-block;
  background-image: url("../../assets/icon/user-minus.svg");
  background-position: cover;
  background-repeat: no-repeat;
  background-size: 30px;
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
.comments-container {
  flex-grow: 1;
  width: 100%;
}
.member-container {
  flex-grow: 0.5;
  width: 50%;
  margin: 0 auto;
}
.user-list {
  overflow-y: scroll;
  background: #f5f5f5;
  color: black;
  max-height: 310px;
}
.user-list li:hover {
  color: #ed8f20;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ed8f20;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ed8f20;
}

button {
  background-color: white;
  color: #ed8f20;
  border: 2px solid #ed8f20;
  /* border-radius: 5px; */
}

button:hover {
  background-color: #ed8f20;
  color: white;
}
button:focus {
  outline: none;
}
.member-headline {
  color: #ed8f20;
  text-decoration-color: black;
  text-decoration: underline;
  font-size: 20px;
}
.title-edit {
  display: block;
}

i:hover {
  cursor: pointer;
}
textarea {
  display: block;
  font-size: 20px;
  /* width: 700px; */
  padding: 5px;
  font-family: "Mina";
  resize: none;
  /* outline-color: #ed8f20 ; */
  outline: 1px solid #ed8f20;
}
textarea:focus {
  outline-color: #ed8f20;
}
.comment-body {
  font-size: 25px;
}
.comment-by {
  font-size: 12px;
  color: lightslategrey;
}
.user-list-container{
  /* margin: 0 auto; */
  float: right;
  width: 60%
}
</style>
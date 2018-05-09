<template>
    <section class="task-details details-container flex flex-column">
      <h3 v-show="isTitleEditMode === false" @dblclick="isTitleEditMode = true">{{editedTask.title}}</h3>
      <input v-show="isTitleEditMode === true" v-model="editedTask.title" @blur="isTitleEditMode=false; updateTask()"
             @keyup.enter="isTitleEditMode=false" autofocus>
      
      <label for="">Label Card:</label>
      <div class="flex label-containe">
        <div @click.stop="updateLabel('red')" class="color red"></div>
        <div @click.stop="updateLabel('orange')" class="color orange"></div>
        <div @click.stop="updateLabel('yellow')" class="color yellow"></div>
        <div @click.stop="updateLabel('green')" class="color green"></div>
      </div>
      <h4>Task Members</h4>
      <button @click="userListOpen=!userListOpen">open users list </button>
      <div class="user-list">
        <ul>
          <li  v-if=userListOpen v-for="user in users" :key="user._id">{{user.name}} <i @click="addUserToTaskMember(user)" class="user-icon"></i></li>
        </ul>
      </div>
        <div>
          <h4>Comments Card</h4>
          <ol>
            <li v-for="comment in editedTask.comments" :key="comment._id">{{comment.txt }} 
              <p> <strong>{{comment.adddedBy}}</strong> {{comment.time | changeDateFilter}}</p>
              <hr>
               </li>
          </ol>
        </div>
        <div class="task-user-list">
        <h1>member list</h1>
        <ul>
          <li v-for="taskMember in taskMembers" :key="taskMember._id">{{taskMember.name}}
            <i @click.stop="deleteTaskMember(taskMember)" class="delete-icon"></i>
          </li>
        </ul>
      </div>
         <textarea placeholder="Enter comment" contenteditable="true" name="" id="" cols="75" rows="5" v-model="addedComment.txt"></textarea>
        <button class="add-comment" @click.stop="addComment">Add Comment</button>
    </section> 
</template>

<script>
import shortid from "shortid";
const moment = require('moment');
export default {
  name: "TaskDetails",
  data() {
    return {
      userListOpen:false,
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
    addUserToTaskMember(user){
       this.$store.dispatch({type:'addUserToTaskMember',user,taskId:this.$route.params.id})
    },
    deleteTaskMember(user){
      this.$store.dispatch({type:'deleteTaskMember',user,taskId:this.$route.params.id})
    }

  },
  computed: {
    editedTask() {
      let adddedBy=this.$store.getters.getCurrUser;
      this.addedComment = { _id: shortid.generate(), txt: "" , adddedBy:adddedBy.name ,time:Date.now()};
      return JSON.parse(JSON.stringify(this.$store.getters.selectedTask));
    },
    users(){ 
      return this.$store.getters.getUsers;
    },
    taskMembers(){
      return this.$store.getters.selectedTask.users;
    }
  },
  created(){
    this.$store.dispatch({type:'loadUsers'})
  },
  filters: {
    changeDateFilter:
      function(value) {
        return moment(value).calendar();
      }
  },  
};
components: {
}
</script>

<style scoped>
section {
  background: #de5928c2;
  color: #231f20;
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
.user-icon{
  display: inline-block;
  background-image: url("../../assets/icon/add-user.svg");
  width: 30px;
  height:30px;
}

.details-container textarea {
  margin: 10px;
  border-radius: 5px;

}

.add-comment {
  padding: 5px;
  margin: 10px;
  border-radius: 5%;
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
  background: rgb(240, 224, 5);
}
.green {
  background: rgb(35, 149, 7);
}
.orange {
  background: rgb(255, 174, 0);
}
.delete-icon{
  display: inline-block;
  background-image:url("../../assets/icon/delete.svg");
  width: 30px;
  height:30px;
}

</style>
// @click.stop="deleteTaskMember(user)"
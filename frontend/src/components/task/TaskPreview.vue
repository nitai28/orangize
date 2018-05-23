<template>
    <section class="task-preview flex space-between" :class="{[task.label]: (task.label) }" @click="showDetails(task)">
        <div class="task-info flex flex-column">
          <h3>{{ task.title }}</h3>
          <div class="flex space-between">
            <div class="task-stats flex align-center">
              <i class="user-icon"></i><span> {{usernumbers}}</span> 
              <i class="comment-icon"></i><span> {{commentNumbers}}</span> 
              <i class="copyright-icon"></i><span>{{ task.createdBy.name }}</span>
            </div>
            <div class="flex align-center">
            </div>
            </div>
          </div>
          <button class="delete-task" @click.stop="removeTask(task)"><img src="../../assets/icon/rubbish-bin.svg" /></button>
    </section>
</template>

<script>
import EventBusService from "../../services/EventBusService";
import TaskService from "../../services/TaskService";
export default {
  name: "TaskPreview",
  props: ["task"],
  methods: {
    showDetails(task) {
      if (this.$store.getters.getCurrUser) {
        EventBusService.$emit("openModal");
        this.$store.commit({ type: "setSelectedTask", task });
        this.$router.push(`/task/${this.task._id}`);
      } else EventBusService.$emit("NotLoggedInError");
    },
    removeTask(task) {
      this.$emit("removeTask", task);
    }
  },
  computed: {
    label() {
      return this.task.labels[0];
    },
    commentNumbers() {
      return this.task.comments.length;
    },
    usernumbers() {
      return this.task.users.length;
    }
  }
};
</script>

<style scoped>
.task-preview {
  display: flex;
  flex-direction: row;
  background-color: #eae7e7f0;
  margin-bottom: 4px;
  border-radius: 5px;
  width: 100%;
  transition: width 0.5s ease-in-out;
  transition: all 0.3s;
}
.task-preview:hover{
  transform: rotate(5deg);
  cursor: pointer;
  column-rule-color: black;
}

h3 {
  width: 100%;
  padding: 5px;
  display: inline-block;
  border-radius: 5%;
}

.task-stats {
  padding: 5px;
}
.task-info {
  width: 100%;
}

.delete-task {
  background-color: transparent;
  display: inline-block;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 5px;
}

.delete-task img {
  width: 15px;
  height: 15px;
}

.delete-task:hover {
  opacity: 1;
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
.user-icon {
  display: inline-block;
  background-image: url("../../assets/icon/users.svg");
  width: 20px;
  height: 20px;
  margin: 5px;
}
.comment-icon {
  display: inline-block;
  background-image: url("../../assets/icon/chat.svg");
  width: 20px;
  height: 20px;
  margin: 5px;
}
.copyright-icon {
  display: inline-block;
  background-image: url("../../assets/icon/copyright.svg");
  width: 20px;
  height: 20px;
  margin: 5px;
}
</style>

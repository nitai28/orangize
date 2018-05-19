<template>
    <section class="card-list">
      <div class="btns-container flex">
        <task-filter @filterChanged="setFilter(filter)"></task-filter>
        <button class="clean-btn btn" @click="addCard">Add List</button>
      </div>
      <ul class="flex flex-row">
        <draggable element="div" v-model="cards" :options="dragOptions" class="flex flex-row clean-card" :move="isMoveEnabled">
        <li class="card-container" v-for="card in cards" :key="card._id">
          <div class="card-title">
            <h3 v-show="editableCardId !== card._id" @dblclick="editTitle(card)">{{card.title}}</h3>
            <input v-show="editableCardId === card._id" v-model="currCard.title" 
                   @blur="editableCardId=null; updateCardTitle(currCard)"
                   @keyup.enter="editableCardId=null">
            <img src="../../assets/icon/rubbish-bin.svg" class="delete-card" @click="deleteCard(card._id)">
          </div>
          <ul class="clean-card tasks-container">
            <card-preview @removeTask="deleteTask" @updateCard="updateCard" :card="card" :tasks="card.tasks"></card-preview>
            <li class="new-task task-preview" @click="createTask(card)">
                Create task...
            </li>
          </ul>
          </li>
          </draggable>
      </ul>
      <div class="modal">
        <modal :activated="modalActive" @updateTask="updateTask"><task-details class="task-details" v-if="selectedTask" :task="selectedTask"></task-details></modal>
      </div>
    </section>
</template>

<script>
import EventBusService from "../../services/EventBusService";
import TaskService from "../../services/TaskService";
import CardService from "../../services/CardService";
import ActivityService from "../../services/ActivityService";
import Modal from "./Modal.vue";
import TaskDetails from "./TaskDetails.vue";
import CardPreview from "./CardPreview.vue";
import TaskFilter from "./TaskFilter.vue";
import Draggable from "vuedraggable";

export default {
  created() {
    this.$store.dispatch({ type: "loadCards" });

    EventBusService.$on("openModal", this.toggleModal);

    EventBusService.$on("task removed", card => {
      this.updateCard(card);
    });
    EventBusService.$on("task added", task => {
      this.addedTask(task);
    });
    EventBusService.$on("card removed", cardId => {
      this.cardRemoved(cardId);
    });
    EventBusService.$on("card added", card => {
      this.$store.commit({ type: "addCard", card });
    });
    EventBusService.$on("card updated", card => {
      this.updateCard(card);
    });
    EventBusService.$on("cards order updated", cards => {
      this.updatedCardsOrder(cards);
    });
  },
  data() {
    return {
      modalActive: false,
      editableCardId: null,
      currCard: {}
    };
  },
  computed: {
    dragOptions() {
      return {
        ghostClass: "ghost"
      };
    },
    selectedTask() {
      return this.$store.getters.selectedTask;
    },
    filter() {
      return this.$store.getters.getFilter;
    },
    cards: {
      get() {
        let cards = this.$store.getters.getCards;
        var copyCards = JSON.parse(JSON.stringify(cards));
        copyCards.forEach((copyCard, idx) => {
          copyCard.tasks = copyCard.tasks.filter(task => {
            if (
              (!this.filter.byLabel || task.label === this.filter.byLabel) &&
              (!this.filter.byTitle ||
                task.title
                  .toLowerCase()
                  .includes(this.filter.byTitle.toLowerCase()))
            )
              return true;
            else return false;
          });
        });
        return copyCards;
      },
      set(value) {
        this.$store.dispatch({ type: "updateCardsOrder", cards: value });
      }
    }
  },
  methods: {
    // ----- [CARD] -----
    addCard(card) {
      if (!this.$store.getters.getCurrUser)
        return EventBusService.$emit("NotLoggedInError");
      this.$store.dispatch({ type: "addCard" });
    },

    deleteCard(cardId) {
      if (!this.$store.getters.getCurrUser)
        return EventBusService.$emit("NotLoggedInError");
      this.$store.dispatch({ type: "deleteCard", cardId });
    },

    editTitle(card) {
      if (!this.$store.getters.getCurrUser)
        return EventBusService.$emit("NotLoggedInError");
      this.editableCardId = card._id;
      this.currCard = JSON.parse(JSON.stringify(card));
    },

    updateCard(card) {
      store.commit({ type: "updateCard", updatedCard });
    },

    updateCardTitle(updatedCard) {
      this.$store.dispatch({type: 'updateCardTitle', updatedCard});
    },

    updatedCardsOrder(cards) {
      this.$store.commit({ type: "setCards", cards: cards });
    },

    // ----- [TASK] -----
    createTask(card) {
      if (!this.$store.getters.getCurrUser)
        return EventBusService.$emit("NotLoggedInError");
      this.$store.dispatch({ type: "addTask", card });
    },

    deleteTask(task) {
      if (!this.$store.getters.getCurrUser)
        return EventBusService.$emit("NotLoggedInError");

      let card = this.cards.find(currCard => currCard._id === task.cardId);

      let newActivity = ActivityService.getRemoveTaskActivity(task, this.$store.getters.getCurrUser);
      this.$store.commit({ type: "addActivity", activity: newActivity });

      let updatedCard = JSON.parse(JSON.stringify(card));
      updatedCard.tasks = updatedCard.tasks.filter(
        currTask => currTask._id !== task._id
      );
      this.updateCard(updatedCard);

      CardService.deleteTask(updatedCard)
        .then(_ => {
          this.$store.commit({ type: "saveCardsBackUp" });
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              this.$store.commit({ type: "setActivities", activities })
            );
          });
        })
        .catch(_ => {
          this.$store.commit({ type: "loadCardsBackUp" });
          this.$store.commit({ type: "loadBackupActivities" });
        });
    },

    updateTask(taskId) {
      let updatedTask;
      this.cards.forEach(card => {
        let tempTask = card.tasks.find(task => task._id === taskId);
        if (tempTask) updatedTask = tempTask;
      });
      let updatedCard = this.cards.find(
        card => card._id === updatedTask.cardId
      );
      CardService.updateCard(updatedCard);
    },

    toggleModal() {
      this.modalActive = !this.modalActive;
    },

    // ----- [FILTER] -----
    isFilter: function() {
      return !this.filter.byLabel;
    },

    setFilter(filter) {
      this.filter = filter;
    },

    isMoveEnabled: function() {
      return (!!this.isFilter() && !!this.$store.getters.getCurrUser)
    }
  },
  components: {
    Modal,
    TaskDetails,
    Draggable,
    CardPreview,
    TaskFilter
  }
};
</script>

<style scoped>
.btns-container {
  height: 60px;
  padding: 10px;
}

.task-filter {
  margin-right: 20px;
}

.new-task {
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  color: antiquewhite;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
  margin-top: 5px;
  cursor: pointer;
}

.item {
  padding: 5px;
  background: #cccccc;
  border: 1px solid black;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
div .ghost {
  opacity: 0.2;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.dragArea {
  min-height: 20px;
}

.card-container {
  margin: 10px;
  padding: 5px;
  background: rgba(204, 202, 184, 0.89);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  border-radius: 5px;
  height: fit-content;
}

.card-title {
  width: 100%;
  display: inline-block;
  padding: 5px;
  align-self: flex-start;
}

.card-title h3 {
  display: inline-block;
  width: 85%;
}

.delete-card {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-left: 10px;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.tasks-container {
  width: 100%;
}

.task-details {
  height: 90%;
  width: 90%;
  margin: auto;
  margin-top: 40px;
}
</style>


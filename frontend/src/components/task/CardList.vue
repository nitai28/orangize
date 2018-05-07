<template>
    <section class="card-list">
      <task-filter @filterChanged="setFilter(filter)"></task-filter>
      <button @click="addCard">Add Card</button>
      <ul class="flex flex-row">
        <draggable v-model="cards" class="flex flex-row clean-card" :move="isFilter">
        <li class="card-container" v-for="card in cards" :key="card._id">
          <div class="card-title">
            <h3 v-show="editableCardId !== card._id" @dblclick="editTitle(card)">{{card.title}}</h3>
            <input v-show="editableCardId === card._id" v-model="currCard.title" 
                   @blur="editableCardId=null; updateCardTitle(currCard)"
                   @keyup.enter="editableCardId=null; updateCardTitle(currCard)">
            <img src="../../assets/icon/rubbish-bin.svg" class="delete-card" @click="deleteCard(card._id)">
          </div>
          <ul class="clean-card tasks-container">
            <card-preview @removeTask="deleteTask" :card="card" :tasks="card.tasks"></card-preview>
            <li class="new-task task-preview" @click="createTask(card)">
                Create task...
            </li>
          </ul>
          </li>
          </draggable>
      </ul>
      <div class="modal">
        <modal :activated="modalActive"><task-details class="tasj-details" v-if="selectedTask" :task="selectedTask"></task-details></modal>
      </div>
    </section>
</template>

<script>
import EventBusService from "../../services/EventBusService";
import TaskService from "../../services/TaskService";
import CardService from "../../services/CardService";
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
      this.addedCard(card);
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
        copyCards.forEach((card, idx) => {
          card.tasks = card.tasks.filter(task => {
            if (!this.filter.byLabel || task.label === this.filter.byLabel)
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
    isFilter: function() {
      console.log("isFILTER", !this.filter.byLabel);
      return !this.filter.byLabel;
    },
    setFilter(filter) {
      this.filter = filter;
    },
    createTask(card) {
      // this.$store.dispatch({ type: "createTask", card });
      var editedCard = JSON.parse(JSON.stringify(card));
      editedCard.tasks.push(TaskService.emptyTask(card._id));
      CardService.addTask(editedCard);
    },
    toggleModal() {
      this.modalActive = !this.modalActive;
    },
    addCard() {
      // this.$store.dispatch({ type: "addCard" });
      var createdCard = CardService.emptyCard();
      CardService.saveCard(createdCard);
    },
    deleteCard(cardId) {
      CardService.deleteCard(cardId);
    },
    updateCardTitle(updatedCard) {
      this.$store.dispatch({ type: "updateCard", updatedCard });
    },
    editTitle(card) {
      this.editableCardId = card._id;
      this.currCard = JSON.parse(JSON.stringify(card));
    },
    updateCard(card) {
      this.$store.commit({ type: "updateCard", updatedCard: card });
    },
    deleteTask(task) {
      CardService.getCardById(task.cardId).then(card => {
        card.tasks = card.tasks.filter(currTask => currTask._id !== task._id);
        CardService.deleteTask(card);
      });
    },
    /////////// After DB has been updated
    cardRemoved(cardId) {
      this.$store.commit({ type: "deleteCard", cardId: cardId });
    },
    addedTask(task) {
      this.$store.commit({ type: "addTask", task });
    },
    addedCard(card) {
      this.$store.commit({ type: "addCard", card });
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
.new-task {
  background-color: rgba(237, 143, 33, 0.75);
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
  padding: 5px;
  margin-top: 5px;
}

.card-container {
  margin: 10px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
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

<template>
    <section class="card-list">
      <task-filter @filterChanged="setFilter(filter)"></task-filter>
      <button @click="addCard">Add Card</button>
      <ul class="flex flex-row">
        <draggable v-model="cards" class="flex flex-row clean-card">
        <li class="card-container" v-for="card in cards" :key="card._id">
          <div class="card-title">
            <h3 v-show="editableCardId !== card._id" @dblclick="editTitle(card)">{{card.title}}</h3>
            <input v-show="editableCardId === card._id" v-model="currCard.title" 
                   @blur="editableCardId=null; updateCardTitle(currCard)"
                   @keyup.enter="editableCardId=null; updateCardTitle(currCard)">
            <img src="../../assets/icon/rubbish-bin.svg" class="delete-card" @click="deleteCard(card._id)">
          </div>
          <ul class="clean-card tasks-container">
            <!-- <card-preview :filter="{byLabel: 'red'}" :card="card" :tasks="card.tasks"></card-preview> -->
            <card-preview :filter="filter" :card="card" :tasks="card.tasks"></card-preview>
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
import EventBusService from '../../services/EventBusService';
import Modal from "./Modal.vue";
import TaskDetails from "./TaskDetails.vue";
import CardPreview from './CardPreview.vue';
import TaskFilter from './TaskFilter.vue';
import Draggable from "vuedraggable";

export default {
  created() {
    this.$store.dispatch({ type: "loadCards" });
    EventBusService.$on('openModal', this.toggleModal);
  },
  data() {
    return {
      filter: {byLabel: '', byTitle: ''},
      modalActive: false,
      editableCardId: null,
      currCard: {}
    };
  },
  computed: {
    selectedTask() {
      return this.$store.getters.selectedTask;
    },
    cards: {
      get() {
        return this.$store.getters.getCards;
      },
      set(value) {
        this.$store.dispatch({ type: "updateCardsOrder", cards: value });
      }
    },
  },
  methods: {
    setFilter(filter) {
      this.filter = filter;
    },
    createTask(card) {
      this.$store.dispatch({ type: "createTask", card });
    },
    toggleModal() {
      this.modalActive = !this.modalActive;
    },
    addCard() {
      this.$store.dispatch({ type: "addCard" });
    },
    deleteCard(cardId) {
      this.$store.dispatch({ type: "deleteCard", cardId });
    },
    updateCardTitle(updatedCard) {
      this.$store.dispatch({ type: "updateCard", updatedCard });
    },
    editTitle(card) {
      this.editableCardId = card._id;
      this.currCard = JSON.parse(JSON.stringify(card));
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

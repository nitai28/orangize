import TaskService from "../services/TaskService.js";
import CardService from "../services/CardService.js";
import SocketService from "../services/SocketService.js";
import BusService from "../services/EventBusService.js";

export default {
  strict: true,
  state: {
    cards: [],
    taskToShow: null,
    selectedTask: null,
    filter: { byLabel: "", byTitle: "" }
  },
  mutations: {
    setFilter(state, { filter }) {
      state.filter = filter;
    },
    setCards(state, { cards }) {
      state.cards = cards;
    },
    setTasks(state, { tasks, cardId }) {
      console.log('tasks', tasks, cardId);
      
      const cardIdx = state.cards.findIndex(card => card._id === cardId);
      state.cards[cardIdx].tasks = tasks;
    },
    updateCard(state, { updatedCard }) {
      const cardIdx = state.cards.findIndex(
        card => card._id === updatedCard._id
      );
      state.cards.splice(cardIdx, 1, updatedCard);
    },
    updateCardsOrder(state, { updatedCards }) {
      state.cards = updatedCards;
    },
    setSelectedTask(state, { task }) {
      state.selectedTask = task;
    },
    newCard(state, { newCard }) {
      state.cards.push(newCard);
    },
    deleteCard(state, { cardId }) {
      const cardIdx = state.cards.findIndex(card => card._id === cardId);
      state.cards.splice(cardIdx, 1);
    },
    addTask(state, { task }) {
      const cardIdx = state.cards.findIndex(card => card._id === task.cardId);
      state.cards[cardIdx].tasks.push(task);
    },
    addCard(state, { card }) {
      state.cards.push(card);
    }
  },
  actions: {
    loadCards(store) {
      return CardService.getCards()
        .then(cards =>
          store.commit({
            type: "setCards",
            cards
          })
        )
        .catch(err => err);
    },
    loadTasks(store) {
      return TaskService.query().then(tasks => {
        store.commit({
          type: "setTasks",
          tasks
        });
      });
    },

    // createTask(store, { card }) {
    //   var editedCard = JSON.parse(JSON.stringify(card));
    //   editedCard.tasks.push(TaskService.emptyTask(card._id));
    //   CardService.saveCard(editedCard).then(_ => {
    //     store.commit({ type: "updateCard", updatedCard: editedCard });
    //     let addedTask = editedCard.tasks[editedCard.tasks.length - 1];
    //     SocketService.addTask(addedTask);
    //   });
    // },
    updateTask(store, { editedTask }) {
      CardService.getCardById(editedTask.cardId).then(card => {
        let taskIdx = card.tasks.findIndex(task => {
          return task._id === editedTask._id;
        });
        card.tasks.splice(taskIdx, 1, editedTask);

        CardService.saveCard(card).then(_ => {
          store.commit({ type: "updateCard", updatedCard: card });
          store.commit({
            type: "setSelectedTask",
            task: card.tasks[taskIdx]
          });
        });
      });
    },

    addCard(store) {
      var createdCard = CardService.emptyCard();
      CardService.saveCard(createdCard).then(newCard => {
        store.commit({ type: "newCard", newCard });
      });
    },
    deleteCard(store, { cardId }) {
      CardService.deleteCard(cardId).then(() => {
        store.commit({
          cardId,
          type: "deleteCard"
        });
      });
    },
    removeTask(store, { task }) {
      CardService.getCardById(task.cardId).then(card => {
        card.tasks = card.tasks.filter(currTask => currTask._id !== task._id);
        CardService.saveCard(card).then(_ => {
          store.commit({
            type: "updateCard",
            updatedCard: card
          });
        });
      });
    },
    updateCard(store, { updatedCard }) {
      CardService.saveCard(updatedCard).then(() => {
        store.commit({ type: "updateCard", updatedCard });
      });
    },
    updateCardsOrder(store, { cards }) {
      CardService.updateAllCards(cards).then(updatedCards => {
        store.commit({ type: "setCards", cards: updatedCards });
      });
    },
    updateTasks(store, { tasks, cardId }) {
      CardService.getCardById(cardId).then(card => {
        let copyTasks = JSON.parse(JSON.stringify(tasks));
        copyTasks.forEach(copyTask => (copyTask.cardId = cardId));
        card.tasks = copyTasks;
        CardService.saveCard(card).then(_ => {
          store.commit({
            type: "setTasks",
            tasks: copyTasks,
            cardId
          });
        });
      });
    },
    addUserToTaskMember(store, { user, taskId }) {
      console.log(store.state.selectedTask);
        CardService.getCardById(store.state.selectedTask.cardId).then(card => {
          // copyTasks.forEach(copyTask => (copyTask.cardId = cardId));
          let taskIdx=card.tasks.findIndex(task=>task._id===taskId)
          card.tasks[taskIdx].users.push(user)
          CardService.saveCard(card).then(_ => {
            store.commit({
              type: "setTasks",
              tasks: card.tasks,
              cardId: store.state.selectedTask.cardId
            });
          });
        });
    },
    deleteTaskMember(store, { user, taskId }) {
      console.log(store.state.selectedTask);
        CardService.getCardById(store.state.selectedTask.cardId).then(card => {
          // copyTasks.forEach(copyTask => (copyTask.cardId = cardId));
          let taskIdx=card.tasks.findIndex(task=>task._id===taskId)
          card.tasks[taskIdx].users.splice(taskIdx,1)
          CardService.saveCard(card).then(_ => {
            store.commit({
              type: "setTasks",
              tasks: card.tasks,
              cardId: store.state.selectedTask.cardId
            });
          });
        });
    },
  },
  
  getters: {
    getCards(state) {
      return state.cards;
    },
    selectedTask(state) {
      return state.selectedTask;
    },
    getFilter(state) {
      return state.filter;
    }
  }
};
// let taskToUpdate = store.state.selectedTask.users.push(user);
        // let cardIndex = store.state.cards.findIndex(
          //   card => card.id === taskToUpdate.cardId
          // );
        
          // let taskIdx = store.state.card[cardIndex].tasks.findIndex(
            //   task => task._id === taskId
            // );
            // CardService.updateUserToTask(user,taskToUpdate);
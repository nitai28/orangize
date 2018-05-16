import TaskService from "../services/TaskService.js";
import CardService from "../services/CardService.js";
import SocketService from "../services/SocketService.js";
import BusService from "../services/EventBusService.js";
import ActivityService from "../services/ActivityService";

export default {
  strict: true,
  state: {
    cards: [],
    cardsBackUp: [],
    taskToShow: null,
    selectedTask: null,
    filter: { byLabel: "", byTitle: "" }
  },
  mutations: {
    setFilter(state, { filter }) {
      state.filter = filter;
    },

    setTasks(state, { tasks }) {
      state.tasks = tasks;
    },

    setCards(state, { cards }) {
      state.cards = cards;
    },
    saveCardsBackUp(state) {
      // console.log('BEFORE', state.cardsBackUp);
      state.cardsBackUp = JSON.parse(JSON.stringify(state.cards));
      // console.log('AFTER', state.cardsBackUp);
    },
    loadCardsBackUp(state) {
      // console.log('BEFORE', state.cardsBackUp);
      state.cards = JSON.parse(JSON.stringify(state.cardsBackUp));
      // console.log('AFTER', state.cardsBackUp);
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
    setSelectedTask(state, { task }) {
      state.selectedTask = task;
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
      state.cards.unshift(card);
    }
  },
  actions: {
    loadCards(store) {
      return CardService.getCards()
        .then(cards => {
          store.commit({ type: "setCards", cards });
          store.commit({ type: "saveCardsBackUp" });
        })
        .catch(err => err);
    },

    loadTasks(store) {
      return TaskService.query().then(tasks => {
        store.commit({ type: "setTasks", tasks });
      });
    },

    updateTask(store, { editedTask }) {
      CardService.getCardById(editedTask.cardId).then(card => {
        let taskIdx = card.tasks.findIndex(task => {
          return task._id === editedTask._id;
        });
        card.tasks.splice(taskIdx, 1, editedTask);

        CardService.saveCard(card).then(_ => {
          store.commit({ type: "updateCard", updatedCard: card });
          store.commit({ type: "saveCardsBackUp" });
          store.commit({ type: "setSelectedTask", task: card.tasks[taskIdx] });
          // ActivityService.updateTask(editedTask).then(activity => {
          //   store.commit({type: 'addActivity', activity});
          // })
        });
      });
    },

    addCard(store) {
      var createdCard = CardService.emptyCard();
      store.commit({ type: "addCard", card: createdCard });
      console.log("updating state and frontend before promise sent to DB");

      CardService.saveCard(createdCard)
        .then(addedCard => {
          store.dispatch({ type: "loadCards" }).then(_ => {
            store.commit({ type: "saveCardsBackUp" });
          });
          ActivityService.addCard(addedCard).then(activity => {
            store.commit({ type: "addActivity", activity });
          });
        })
        .catch(_ => {
          store.commit({ type: "loadCardsBackUp" });
          console.log(
            "reverting back to state before change if promise was rejected"
          );
        });
    },

    // addCard(store) {
    //   var createdCard = CardService.emptyCard();
    //   CardService.saveCard(createdCard).then(newCard => {
    //     store.commit({ type: "newCard", newCard });
    //   });
    // },
    // addCard(store) {
    //   CardService.saveCard(createdCard).then(newCard => {
    //     store.commit({ type: "newCard", newCard });
    //   });
    // },

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
        ActivityService.updateCard(updatedCard).then(activity => {
          store.commit({ type: "addActivity", activity });
        });
      });
    },

    updateCardsOrder(store, { cards }) {
      store.commit({ type: "setCards", cards });
      CardService.updateAllCards(cards)
        .then(updatedCards => {
          store.commit({ type: "setCards", cards: updatedCards });
          store.commit({ type: "saveCardsBackUp" });
        })
        .catch(err => {
          console.log("Failed updateCardsOrder", err);
          store.commit({ type: "loadCardsBackUp" });
        });
    },

    updateTasks(store, { tasks, cardId }) {
      store.commit({ type: "setTasks", tasks, cardId });
      CardService.getCardById(cardId)
      .then(card => {
        let copyTasks = JSON.parse(JSON.stringify(tasks));
        copyTasks.forEach(copyTask => (copyTask.cardId = cardId));
        card.tasks = copyTasks;
        CardService.saveCard(card).then(_ => {
          store.commit({ type: "saveCardsBackUp" });
          ActivityService.moveTask().then(activity => {
              store.commit({ type: "addActivity", activity });
            });
          });
        })
        .catch(_ => {
          store.commit({ type: "loadCardsBackUp" });
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
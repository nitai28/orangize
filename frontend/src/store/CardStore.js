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

    // setTasks(state, { tasks }) {
    //   state.tasks = tasks;
    // },

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
      // console.log('tasks', tasks, cardId);

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
      state.cards.forEach((card, idx) => {
        console.log("card", card, "pos", card.pos);
        if (state.cards[cardIdx].pos < card.pos) state.cards[idx].pos--;
      });

      state.cards.splice(cardIdx, 1);
    },

    addCard(state, { card }) {
      state.cards.forEach(card => card.pos++);
      state.cards.unshift(card);
    },
    updateAddedCard(state, { updatedCard }) {
      for (let i = state.cards.length - 1; i >= 0; i--) {
        let card = state.cards[i];
        if (!card._id) {
          state.cards.splice(i, 1, updatedCard);
          return;
        }
      }
    }
  },
  actions: {
    // ----- [CARD] -----
    loadCards(store) {
      return CardService.getCards()
        .then(cards => {
          store.commit({ type: "setCards", cards });
          store.commit({ type: "saveCardsBackUp" });
        })
        .catch(err => err);
    },

    addCard(store) {
      var createdCard = CardService.emptyCard();
      store.commit({ type: "addCard", card: createdCard });
      console.log("updating state and frontend before promise sent to DB");

      CardService.saveCard(createdCard)
        .then(addedCard => {
          // store.commit({type: 'updateAddedCard', updatedCard: addedCard})
          store.dispatch({ type: "loadCards" });
          let newActivity = ActivityService.getAddCardActivity(
            addedCard,
            store.getters.getCurrUser
          );
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        })
        .catch(_ => {
          console.log(_);
          store.commit({ type: "loadCardsBackUp" });
          console.log(
            "reverting back to state before change if promise was rejected"
          );
        });
    },

    deleteCard(store, { cardId }) {
      // if card isn't loaded yet, do nothing.
      if (!cardId) return;
      let card = store.getters.getCards.find(currCard => currCard._id === cardId);
    
      store.commit({ type: "deleteCard", cardId });
      console.log("updating state and frontend before promise sent to DB");
      
      CardService.deleteCard(cardId)
        .then(_ => {
          store.commit({ type: "saveCardsBackUp" });
          let newActivity = ActivityService.getRemoveCardActivity(
            card,
            store.getters.getCurrUser
          );
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        })
        .catch(_ => {
          console.log(_);
          store.commit({ type: "loadCardsBackUp" });
          console.log(
            "reverting back to state before change if promise was rejected"
          );
        });
    },

    updateCardTitle(store, { updatedCard }) {
      store.commit({ type: "saveCardsBackUp" });
      store.commit({ type: "updateCard", updatedCard });
      CardService.updateCard(updatedCard)
        .then(_ => {
          let newActivity = ActivityService.getUpdateCardActivity(
            updatedCard,
            store.getters.getCurrUser
          );
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        })
        .catch(_ => {
          store.commit({ type: "loadCardsBackUp" });
        });
    },

    updateCardsOrder(store, { cards }) {
      store.commit({ type: "setCards", cards });
      CardService.updateAllCards(cards)
        .then(updatedCards => {
          store.commit({ type: "setCards", cards: updatedCards });
          store.commit({ type: "saveCardsBackUp" });
          let newActivity = ActivityService.getMoveCardActivity(
            store.getters.getCurrUser
          );
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        })
        .catch(err => {
          console.log("Failed updateCardsOrder", err);
          store.commit({ type: "loadCardsBackUp" });
        });
    },

    // ----- [TASK] -----

    loadTasks(store) {
      return TaskService.query().then(tasks => {
        store.commit({ type: "setTasks", tasks });
      });
    },

    updateTask(store, { editedTask }) {
      let selectedCard = store.getters.getCards.find(
        card => card._id === editedTask.cardId
      );
      let copyCard = JSON.parse(JSON.stringify(selectedCard));
      let taskIdx = copyCard.tasks.findIndex(
        task => task._id === editedTask._id
      );
      copyCard.tasks.splice(taskIdx, 1, editedTask);
      store.commit({ type: "updateCard", updatedCard: copyCard });

      CardService.updateAllCards(store.getters.getCards)
        .then(_ => {
          store.commit({ type: "saveCardsBackUp" });
          store.commit({
            type: "setSelectedTask",
            task: copyCard.tasks[taskIdx]
          });
          let newActivity = ActivityService.getUpdateTaskActivity(
            editedTask,
            store.getters.getCurrUser
          );
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        })
        .catch(err => {
          console.log("Failed updateTask", err);
          store.commit({ type: "loadCardsBackUp" });
        });
    },
    addTask(store, { card }) {
      // If card isn't loaded, do nothing.
      if (!card._id) return;
      var editedCard = JSON.parse(JSON.stringify(card));
      let newTask = TaskService.emptyTask(card._id, store.getters.getCurrUser);
      editedCard.tasks.push(newTask);
      store.commit({ type: "updateCard", updatedCard: editedCard });
      // console.log('CARDS', store.getters.getCards);
      CardService.updateAllCards(store.getters.getCards)
        .then(_ => {
          store.commit({ type: "saveCardsBackUp" });
          let newActivity = ActivityService.getAddTaskActivity(
            newTask,
            store.getters.getCurrUser
          );
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        })
        .catch(_ => {
          store.commit({ type: "loadCardsBackUp" });
          console.log(
            "reverting back to state before change if promise was rejected"
          );
        });
    },

    deleteTask(store, { task }) {
      let card = store.getters.getCards.find(
        currCard => currCard._id === task.cardId
      );

      let newActivity = ActivityService.getRemoveTaskActivity(
        task,
        store.getters.getCurrUser
      );
      store.commit({ type: "addActivity", activity: newActivity });

      let updatedCard = JSON.parse(JSON.stringify(card));
      updatedCard.tasks = updatedCard.tasks.filter(
        currTask => currTask._id !== task._id
      );
      store.commit({ type: "updateCard", updatedCard });

      CardService.deleteTask(updatedCard)
        .then(_ => {
          store.commit({ type: "saveCardsBackUp" });
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        })
        .catch(_ => {
          store.commit({ type: "loadCardsBackUp" });
          store.commit({ type: "loadBackupActivities" });
        });
    },

    updateTasks(store, { tasks, cardId }) {
      let selectedCard = store.getters.getCards.find(
        card => card._id === cardId
      );
      let copyCard = JSON.parse(JSON.stringify(selectedCard));
      let copyTasks = JSON.parse(JSON.stringify(tasks));
      copyTasks.forEach(copyTask => (copyTask.cardId = cardId));
      copyCard.tasks = copyTasks;
      let copyCards = store.getters.getCards;
      let cardIdx = copyCards.findIndex(card => card._id === copyCard._id);
      copyCards[cardIdx] = copyCard;
      store.commit({ type: "updateCard", updatedCard: copyCard });
      CardService.updateAllCards(copyCards)
        .then(_ => {
          store.commit({ type: "saveCardsBackUp" });
          let newActivity = ActivityService.getMoveTaskActivity(
            store.getters.getCurrUser
          );
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        })
        .catch(err => {
          console.log(err);
          store.commit({ type: "loadCardsBackUp" });
        });
    },
    addUserToTaskMember(store, { user, taskId }) {
      CardService.getCardById(store.state.selectedTask.cardId).then(card => {
        let taskIdx = card.tasks.findIndex(task => task._id === taskId);
        if (!card.tasks[taskIdx].users.find(userdb => userdb._id === user._id))
          card.tasks[taskIdx].users.push(user);
        else return;
        CardService.saveCard(card).then(_ => {
          store.commit({
            type: "setTasks",
            tasks: card.tasks,
            cardId: store.state.selectedTask.cardId
          });
          var task = card.tasks[taskIdx];
          store.commit({ type: "setSelectedTask", task: task });
          let newActivity = ActivityService.getUpdateTaskActivity(
            card.tasks[taskIdx],
            store.getters.getCurrUser
          );
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        });
      });
    },
    deleteTaskMember(store, { user, taskId }) {
      console.log(store.state.selectedTask);
      CardService.getCardById(store.state.selectedTask.cardId).then(card => {
        let taskIdx = card.tasks.findIndex(task => task._id === taskId);
        card.tasks[taskIdx].users.splice(taskIdx, 1);
        CardService.saveCard(card).then(_ => {
          store.commit({
            type: "setTasks",
            tasks: card.tasks,
            cardId: store.state.selectedTask.cardId
          });
          var task = card.tasks[taskIdx];
          store.commit({ type: "setSelectedTask", task: task });
          let newActivity = ActivityService.getUpdateTaskActivity(
            card.tasks[taskIdx],
            store.getters.getCurrUser
          );
          ActivityService.addActivity(newActivity).then(activity => {
            ActivityService.query().then(activities =>
              store.commit({ type: "setActivities", activities })
            );
          });
        });
      });
    }
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

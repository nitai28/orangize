import TaskService from "../services/TaskService.js";
import CardService from "../services/CardService.js";

export default {
  strict: true,
  state: {
    cards: [],
    taskToShow: null,
    selectedTask: null
  },
  mutations: {
    setTasks(state, {
      tasks
    }) {
      state.tasks = tasks;
    },
    setCards(state, {
      cards
    }) {
      state.cards = cards;
    },
    setTasks(state, {
      tasks,
      cardId
    }) {
      const cardIdx = state.cards.findIndex(card => card._id === cardId);
      state.cards[cardIdx].tasks = tasks;
    },
    updateCard(state, {
      updatedCard
    }) {
      const cardIdx = state.cards.findIndex(
        card => card._id === updatedCard._id
      );
      state.cards.splice(cardIdx, 1, updatedCard);
    },
    updateCardsOrder(state, {
      updatedCards
    }) {
      state.cards = updatedCards;
    },
    setSelectedTask(state, {
      task
    }) {
      state.selectedTask = task;
    },
    newCard(state, {
      newCard
    }) {
      state.cards.push(newCard);
    },
    deleteCard(state, {
      cardId
    }) {
      const cardIdx = state.cards.findIndex(card => card._id === cardId);
      state.cards.splice(cardIdx, 1);
    }
  },
  actions: {
    loadCards(store) {
      return CardService.getCards()
        .then(cards => store.commit({
          type: "setCards",
          cards
        }))
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

    createTask(store, {
      card
    }) {
      var editedCard = JSON.parse(JSON.stringify(card));
      editedCard.tasks.push(TaskService.emptyTask(card._id));
      CardService.saveCard(editedCard).then(_ => {
        store.commit({
          type: "updateCard",
          updatedCard: editedCard
        });
      });
    },
    updateTask(store, {
      editedTask
    }) {
      CardService.getCardById(editedTask.cardId).then(card => {
        let taskIdx = card.tasks.findIndex(task => {
          return task._id === editedTask._id
        });
        card.tasks.splice(taskIdx, 1, editedTask);

        CardService.saveCard(card).then(_ => {
          store.commit({
            type: "updateCard",
            updatedCard: card
          });
          store.commit({
            type: "setSelectedTask",
            task: card.tasks[taskIdx]
          });
        });
      });
    },

    addCard(store) {
      var createdCard = CardService.emptyCard();
      CardService.saveCard(createdCard).then((newCard) => {
        store.commit({
          type: 'newCard',
          newCard
        })
      })
    },
    deleteCard(store, {
      cardId
    }) {
      CardService.deleteCard(cardId).then(() => {
        store.commit({
          cardId,
          type: 'deleteCard'
        })
      })
    },
    removeTask(store, {
      task
    }) {
      CardService.getCardById(task.cardId)
        .then(card => {
          card.tasks = card.tasks.filter(currTask => currTask._id !== task._id);
          CardService.saveCard(card).then(_ => {
            store.commit({
              type: 'updateCard',
              updatedCard: card
            });
          })
        })
    },
    updateCard(store, {
      updatedCard
    }) {
      CardService.saveCard(updatedCard)
        .then(() => {
          store.commit({
            type: 'updateCard',
            updatedCard
          });
        })
    },
    updateCardsOrder(store, {
      cards
    }) {
      CardService.updateAllCards(cards)
        .then(updatedCards => {
          store.commit({
            type: 'setCards',
            cards: updatedCards
          })
        })
    },
    updateTasks(store, {
      tasks,
      cardId
    }) {
      CardService.getCardById(cardId).then(card => {
        let copyTasks = JSON.parse(JSON.stringify(tasks));
        copyTasks.forEach(copyTask => copyTask.cardId = cardId);
        card.tasks = copyTasks;
        CardService.saveCard(card).then(_ => {
          store.commit({
            type: 'setTasks',
            tasks: copyTasks,
            cardId
          })
        })
      })

    },
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getCards(state) {
      return state.cards;
    },
    selectedTask(state) {
      return state.selectedTask;
    }
  }
};
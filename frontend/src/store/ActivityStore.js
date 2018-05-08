import ActivityService from "../services/ActivityService";

export default {
  strict: true,
  state: {
    activities: [],
    activitiesBackup: []
  },
  mutations: {
    loadBackupActivities(state) {
        state.activities = JSON.parse(JSON.stringify(state.activitiesBackup));
    },
    setActivities(state, {activities}) {
        state.activities = activities;
        state.activitiesBackup = activities;
    },
    addActivity(state, {activity}) {
      state.activities.unshift(activity);
    }
  },
  actions: {
    // createTask(store, { card }) {
    //   var editedCard = JSON.parse(JSON.stringify(card));
    //   editedCard.tasks.push(TaskService.emptyTask(card._id));
    //   CardService.saveCard(editedCard).then(_ => {
    //     store.commit({ type: "updateCard", updatedCard: editedCard });
    //     let addedTask = editedCard.tasks[editedCard.tasks.length - 1];
    //     SocketService.addTask(addedTask);
    //   });
    // },
  },

  getters: {
    getActivities(state) {
      return state.activities;
    }
  }
};

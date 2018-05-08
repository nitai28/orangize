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
    loadActivities(store) {
      return ActivityService.query()
        .then(activities =>
          store.commit({ type: "setActivities", activities })
        )
        .catch(err => err);
    },
  },

  getters: {
    getActivities(state) {
      return state.activities;
    }
  }
};

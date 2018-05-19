import shortid from "shortid";
var debounce = require("debounce");

const ACTIVITY_URL = "/activity";

function _emptyActivity() {
  return {
    action: "",
    txt: "",
    at: Dath.Now(),
    by: {
      name: ""
    },
    taskId: ""
  };
}

function query() {
  return axios
    .get(ACTIVITY_URL)
    .then(res => res.data)
    .catch(e => console.log("No Activities", e));
}

function addActivity(activity) {
  return axios.post(ACTIVITY_URL, activity).then(res => {
    let addedActivity = res.data[0];
    return addedActivity;
  });
}

// ----- [TASK] -----

function getAddTaskActivity(task, user) {
  return {
    action: "Add Task",
    txt: `A new task has been added by ${user.name}.`,
    at: Date.now(),
    by: {
      user
    },
    taskId: task._id
  };
}

function getRemoveTaskActivity(task, user) {
  return {
    action: "Remove Task",
    txt: `${task.title} has been removed by ${user.name}.`,
    at: Date.now(),
    by: {
      user
    },
    taskId: task._id
  };
}

function getUpdateTaskActivity(task, user) {
  return {
    action: "Update Task",
    txt: `${task.title} has been updated by ${user.name}.`,
    at: Date.now(),
    by: {
      user
    },
    taskId: task._id
  };
}
// TODO: Add debounce!
function getMoveTaskActivity(user) {
  // debounce(function () {
  return {
      _id: shortid.generate(),
      action: "Move Task",
      txt: `Task order has been changed by ${user.name}.`,
      at: Date.now(),
      by: {
        user
      }
    };
  // }, 200)
}


// ----- [CARD] -----
function getAddCardActivity(card, user) {
  return {
      _id: shortid.generate(),
      action: "Add Card",
      txt: `A new card has been added by ${user.name}.`,
      at: Date.now(),
      by: {
        user
      },
      cardId: card._id
    };
    resolve(activity);
}

function getRemoveCardActivity(card, user) {
  return {
    _id: shortid.generate(),
    action: "Remove Card",
    txt: `A card '${card.title}' has been removed by ${user.name}.`,
    at: Date.now(),
    by: {
      user
    },
    cardId: card._id
  };
}

function getUpdateCardActivity(card, user) {
    return {
      _id: shortid.generate(),
      action: "Update Card",
      txt: `A card '${card.title}' has been updated by ${user.name}.`,
      at: Date.now(),
      by: {
        user
      },
      cardId: card._id
    };
  }

function getMoveCardActivity(user) {
  return {
    _id: shortid.generate(),
    action: "Move Card",
    txt: `Cards order has been changed by ${user.name}.`,
    at: Date.now(),
    by: {
      user
    },
  };
}

export default {
  query,
  addActivity,
  getAddTaskActivity,
  getRemoveTaskActivity,
  getUpdateTaskActivity,
  getMoveTaskActivity,
  getAddCardActivity,
  getRemoveCardActivity,
  getUpdateCardActivity,
  getMoveCardActivity,
};

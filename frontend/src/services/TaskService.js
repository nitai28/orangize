const TASK_URL = '/task';
import CardService from './CardService.js'
var shortid = require('shortid');

function emptyTask(cardId) {
    return {
        _id: shortid.generate(),
        title : 'EMPTY TASK',
        users : [],
        label : '',
        desc : 'This is an empty task!',
        comments : [],
        deadline : '10/05/2018',
        isDone : false,
        cardId
    }
}

function getTaskById(cardId, taskId) {
    var currCard = CardService.getCardById(cardId);
    return currCard.tasks.find(task => task.id === taskId) //check if _ is needed for id (depends on DB)
}

function deleteTask(cardId, taskId) {
    var currCard = CardService.getCardById(cardId);
    currTaskIdx =  currCard.tasks.findIndex(task => task.id === taskId)
    currCard.tasks.splice(currTaskIdx, 1);
    return axios
        .put(_getCardUrl(cardId))
        .then(res => res,data)
}
function updateComment(updateTask,cardId){
    var currCard = CardService.getCardById(cardId); 
    currTask =  currCard.tasks.find(task => task.id === updateTask.id)
    // currTask
    currTask.comments.unshift();
    return axios
        .put(_getCardUrl(cardId))
        .then(res => res,data)
}


export default {
  
    emptyTask,
    // getTaskById,
    // deleteMultTasks,
    getTaskById,
    deleteTask,
    updateComment
}
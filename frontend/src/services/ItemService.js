const ITEM_URL = '/item';
import ListService from './ListService.js'
var shortid = require('shortid');

function emptyItem(listId) {
    return {
        _id: shortid.generate(),
        title : 'EMPTY ITEM',
        users : [],
        label : '',
        desc : 'This is an empty item!',
        comments : [],
        deadline : '10/05/2018',
        isDone : false,
        listId
    }
}

function getItemById(listId, itemId) {
    var currList = ListService.getListById(listId);
    return currList.items.find(item => item.id === itemId) //check if _ is needed for id (depends on DB)
}

function deleteItem(listId, itemId) {
    var currList = ListService.getListById(listId);
    currItemIdx =  currList.items.findIndex(item => item.id === itemId)
    currList.items.splice(currItemIdx, 1);
    return axios
        .put(_getListUrl(listId))
        .then(res => res,data)
}
function updateComment(updateItem,listId){
    var currList = ListService.getListById(listId); 
    currItem =  currList.items.find(item => item.id === updateItem.id)
    // currItem
    currItem.comments.unshift();
    return axios
        .put(_getListUrl(listId))
        .then(res => res,data)
}


export default {
  
    emptyItem,
    // getItemById,
    // deleteMultItems,
    getItemById,
    deleteItem,
    updateComment
}
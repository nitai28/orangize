const CARD_URL = "/card";
import SocketService from './SocketService.js'


function emptyCard() {
    return {
        title : 'Some Sort of Card',
        tasks : []
    }
}

function getCards() {
  return axios
    .get(CARD_URL)
    .then(res => res.data)
    .catch(e => console.log("No Cards", e));
}

function saveCard(card) {
    if (card._id) return axios.put(_getCardUrl(card._id), card)
    else return axios.post(CARD_URL, card).then(res => {
      let addedCard = res.data[0];  
      SocketService.addCard(addedCard);
      })
}

function deleteTask(card) {
  return axios.put(_getCardUrl(card._id), card).then(_ =>{
    SocketService.removeTask(card);

  })
}

function addTask(card) {
  return axios.put(_getCardUrl(card._id), card).then(_ =>{
    let addedTask = card.tasks[card.tasks.length - 1];
    SocketService.addTask(addedTask);
})
}

function deleteCard(cardId) {
  return axios.delete(_getCardUrl(cardId)).then(() => {
    SocketService.removeCard(cardId);
  });
}

function getCardById(cardId) {
  return axios.get(_getCardUrl(cardId)).then(res => res.data);
}

function _getCardUrl(cardId) {
  return `${CARD_URL}/${cardId}`;
}

function updateAllCards(cards) {
  // axios.put(_getCardUrl(card._id), card)
  return axios.put('/board', cards).then(res => res.data);
}

export default {
  getCards,
  saveCard,
  deleteCard,
  emptyCard,
  getCardById,
  updateAllCards,
  addTask,
  deleteTask
};

const CARD_URL = "/card";

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
    else return axios.post(CARD_URL, card).then(res => res.data[0])
}

function deleteCard(cardId) {
  return axios.delete(_getCardUrl(cardId));
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
  updateAllCards
};

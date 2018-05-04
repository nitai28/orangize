const LIST_URL = "/list";

function emptyList() {
  return {
    _id: ObjectId("5ae9c24dafaf4a13784ba582"),
    title: "Some Sort of List",
    items: []
  };
}

function getLists() {
  return axios
    .get(LIST_URL)
    .then(res => res.data)
    .catch(e => console.log("No Lists", e));
}

function saveList(list) {
  if (list._id) return axios.put(_getListUrl(list._id), list);
  else return axios.post(LIST_URL, list);
}

function deleteList(listId) {
  return axios.delete(_getListUrl(listId));
}

function getListById(listId) {
  return axios.get(_getListUrl(listId)).then(res => res.data);
}

function _getListUrl(listId) {
  return `${LIST_URL}/${listId}`;
}


export default {
  getLists,
  saveList,
  deleteList,
  emptyList,
  getListById,
};

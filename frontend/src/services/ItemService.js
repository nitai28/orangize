const ITEM_URL = '/item';

function emptyItem() {
    return {
        title : 'EMPTY ITEM',
        users : [],
        labels : [],
        desc : 'This is an empty item!',
        comments : [],
        deadline : '10/05/2018',
        isDone : false
    }
}

function query() {
    return axios
            .get(ITEM_URL)
            .then(res => res.data)
            .catch(e => console.log('No Items', e))
}

function saveItem(item) {
    if (item._id) return axios.put(_getItemUrl(item._id), item)
    else return axios.post(ITEM_URL, item);  
}

function deleteItem(itemId) {
    return axios.delete(_getItemUrl(itemId))
}


function getItemById(itemId) {
    return axios
    .get(_getItemUrl(itemId))
    .then(res => res.data)
}

function deleteMultItems(itemIds) {
}

function _getItemUrl(itemId) {
    return `${ITEM_URL}/${itemId}`;
}

export default {
    query,
    saveItem,
    deleteItem,
    emptyItem,
    getItemById,
    deleteMultItems
}
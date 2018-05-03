

<template>
    <section class="flex flex-column ">
        <h1>{{editedItem.name}}</h1>
        <span>{{editedItem.labels}}</span>
        <textarea contenteditable="true" name="" id="" cols="5" rows="5" v-model="editedItem.desc"></textarea>
        <input type="text" />
        <textarea placeholder="Enter comment" contenteditable="true" name="" id="" cols="5" rows="5" v-model="addedComment.txt"></textarea>
        <button @click="addComment">Add Comment</button>
        <ul>
          <li v-for="comment in item.comments" :key="comment._id">{{comment.txt }} </li>
        </ul>
        <!-- <ul>
          <li v-for="comment in item.comments">{{comment}}</li>
        </ul>   -->
        
    </section>
</template>

<script>
import shortid from 'shortid';
import ItemService from '../../services/ItemService.js'
export default {
  name: 'ItemDetails',
  props:['item'],
  data(){
    return {
      editedItem: JSON.parse(JSON.stringify(this.item)),
      addedComment: {_id: shortid.generate(), txt: ''}
      
    }
  },
  
  methods: {
    addComment(){
      editedItem.comments.unshift(addedComment)
      this.$store.dispatch({type:'addComment',editedItem})
    }
    
  },
  components: {
  }
};
</script>

<style scoped>
section{
    background: rgba(0, 0, 0, 0.329);
    color: rgb(40, 40, 212);
    width:300px;
    text-align: center;
    margin: 0 auto;

}

</style>

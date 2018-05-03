

<template>
    <section class="flex flex-column ">
        <h1>{{item.name}}</h1>
        <span>{{item.labels}}</span>
        <textarea name="" id="" cols="5" rows="5" v-model="item.desc"></textarea>
        <input type="text" />
        <button>Add Comment</button>
        <textarea name="" id="" cols="5" rows="5" v-model="item.comments"></textarea>
    </section>
</template>

<script>
export default {
  name: 'ItemDetails',
  created() {

  },
  // props: ['currTodo'],
  data() {
    return {
      item: {
        id: null,
        name: '',
        labels: [],
        desc: '',
        comments: [],
        deadlines: Date.now()
      }
    };
  },
  methods: {
    
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



<template>
    <section class="todo-item flex align-center justify-center space-between" @click="toggleIsDone(currTodo.id)" @contextmenu.prevent="editable = !editable">
        <input style="display: none" type="checkbox" :id="currTodo.id" :checked="currTodo.isDone" />
        <label v-if="!editable" :for="currTodo.id"> {{ currTodo.text }} </label>
        <todo-edit v-else :currTodo="currTodo"></todo-edit>
        <button @click="removeTodo(currTodo.id)"><i class="far fa-trash-alt"></i></button>
    </section>
</template>

<script>
import TodoEdit from '@/components/TodoEdit.vue';
export default {
    props: ['currTodo'],
    data() {
        return {
            editable: false
        }
    },
    methods: {
        toggleIsDone(id) {
            this.$store.dispatch({ type: 'toggleIsDone', id: id });
        },
        removeTodo(id) {
            this.$store.dispatch({ type: 'deleteTodo', id: id });
        }
    },
    components: {
        TodoEdit        
    }
}
</script>

<style>
    .todo-item {
        border-bottom: 1px solid black;
        height: 40px;
        padding: 4px;
        color: white;
    }
    .todo-item:hover {
        background-color: #555555;
    }
</style>

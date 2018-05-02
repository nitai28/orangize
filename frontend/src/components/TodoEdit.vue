<template>
    <section class="todo-edit">
        <form v-if="todo.id" @submit.prevent="editTodo">
            <input prefix-icon="el-icon-circle-plus" v-model="todo.text" @keyup.enter="editTodo" placeholder="Edit"/>            
        </form>
        <form v-else @submit.prevent="addTodo">
            <el-input class=".el-input__inner" v-model="todo.text" placeholder="Enter new todo."/>
        </form>
    </section>
</template>

<script>
import todosService from "../services/todos.service";
export default {
    props: {
        'currTodo': {
            type: Object
        }
    },
        created() {
            if (!this.currTodo) this.todo = this.getEmptyTodo();
            else this.todo = { ...this.currTodo }
        },
        data() {
            return {
                todo: {}
            }
        },
        methods: {
            addTodo() {
                console.log()
                this.todo.isDone = false;
                this.$store.dispatch({ type: 'saveTodo', todo: this.todo })
                this.todo = { id: '', text: '', isDone: '' };
            },
            editTodo() {
                this.$parent.editable = false;
                this.$store.dispatch({ type: 'saveTodo', todo: this.todo })
            },
            getEmptyTodo() {
                return todosService.getEmptyTodo();
            }
        },
}


</script>

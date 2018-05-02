<template>
    <section class="todo-user">
        <div class="active-todos flex flex-column space-between">
            <el-badge :value="activeTodos" :max="10" class="item">
                <el-button size="small">Todos Left</el-button>
            </el-badge>
        </div>
    </section>
</template>

<script>
    export default {
        computed: {
            activeTodos(){
                return this.$store.getters.getActiveTodosLength;
            },
            user(){
                return this.$store.state.user.userName;
            }
        },
    }
</script>

<style>
    .active-todos {
        /* width:50px; */
    }
</style>
<template>
    <el-radio-group v-model="filterByStatus" @change="setFilterByStatus" fill="#056571">
        <el-radio-button label="All"></el-radio-button>
        <el-radio-button label="Active"></el-radio-button>
        <el-radio-button label="Done"></el-radio-button>
    </el-radio-group>
</template>

<script>
export default {
  data() {
    return {
      filterByStatus: "All"
    };
  },
  methods: {
      setFilterByStatus(status) {
      this.$store.commit({
        type: "setFilterByStatus",
        status: this.filterByStatus
      });
      this.$store.dispatch({ type: "loadTodos" });
    },
  }
}
</script>


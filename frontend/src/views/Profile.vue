<template>
    <section class="profile">
        <h1>Username: {{ userData.userName }}</h1>
        <form @submit.prevent="saveUserName">
            <input type="text" placeholder="Enter new name here..." min="4" max="20" v-model="userName"/>
            <button type="submit">Save</button>
            <h2>History of {{ userData.userName }}:</h2>
            <ul class="clean-list">
                <li v-for="action in userData.actions" :key="action.at">{{action.name }} || {{ action.at | moment("calendar") }}</li>
            </ul>
        </form>
   </section>
</template>

<script>

export default {
  name: "Profile",
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    saveUserName() {
      this.$store.dispatch({ type: "saveUserName", userName: this.userName });
    }
  },
  computed: {
    userData() {
      this.userName = this.$store.getters.getUserData.userName;
      return this.$store.getters.getUserData;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadUserData" });
  }
};
</script>

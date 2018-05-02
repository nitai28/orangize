<template>
  <section class="register-page">
        <h1>Register:</h1>
        <form @submit.prevent="register">
            <input type="text" placeholder="username" v-model="user.name" />
            <input type="password" placeholder="password" v-model="user.password" />
            <button type="submit">Register</button>
        </form>
    </section>
</template>

<script>
export default {
  name: "RegisterPage",
  created() {},
  data() {
    return {
      user: { name: "", password: "" }
    };
  },
  methods: {
    register() {
      UserService.register(this.user)
        .then(res => {
          console.log("Register Completed, now try to log-in!");
          EventBusService.$emit(SHOW_MSG, {
            txt: "Registration Completed! please login"
          });
          this.$router.push("/login");
        })
        .catch(err => console.log("Register Failed!"));
    }
  },
  computed: {}
};
</script>

<style>

</style>

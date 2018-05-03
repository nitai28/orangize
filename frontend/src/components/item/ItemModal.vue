<template>
  <section id="modal-component" @keyup.esc="close">
  <div class="modal-body" v-bind:class="{'active-in-component': mutableActived }"> 
    <div class="modal-content" v-html="message"></div>
         <div class="modal-close" @click="close"><i class="zmdi zmdi-close"></i></div>
         <slot></slot>
  </div>     
</section>

</template>

<script>
export default {
name: "modalComponent",
  data() {
    return {
      mutableActived: false,
      message: "<i>Modal Content!</i>"
    };
  },
  props: ["activated"],
  methods: {
    close() {
      this.mutableActived = !this.mutableActived;
      this.$el.blur();
    }
  },
  watch: {
    activated(oldVal, newVal) {
      if (oldVal !== newVal) {
        this.mutableActived = !this.mutableActived;
        this.$el.tabIndex = 1;
        this.$nextTick(function() {
          this.$el.focus();
        });
      }
    }
  }
}

</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
a {
  text-decoration: none;
}
.page {
  width: 100%;
  height: 100%;
  border: 10px ridge rebeccapurple;
  box-sizing: border-box;
  background: #ffffff;
  background: linear-gradient(to bottom, #ffffff 0%, #f3f3f3 50%, #ededed 51%, #ffffff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
}
.page .info {
  margin-bottom: 70px;
  font-family: sans-serif;
  font-size: 20px;
  text-align: center;
  padding: 0 24px;
}
.page .toggle-modal {
  text-align: center;
  width: 300px;
  height: 50px;
  line-height: 54px;
  background: #fff;
  border: 0;
  border-radius: 10px;
  color: rebeccapurple;
  outline: 0;
  transition: 300ms;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  font-size: 20px;
  font-family: "Baloo Bhaina", cursive;
}
.page .toggle-modal:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}
.page .toggle-modal:active {
  box-shadow: 0 0 22px rgba(0, 0, 0, 0.8);
  background: #eee;
}
.modal-body {
  transition: 500ms all cubic-bezier(0.14, 1.02, 0.15, 0.98);
  width: 0px;
  height: 100vh;
  background: rgba(51, 111, 153, 0.82);
  -webkit-transform: translate3d(-100vw, 100vh, 0);
          transform: translate3d(-100vw, 100vh, 0);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  font-family: "Baloo Bhaina", cursive;
  width: 100vw;
  -webkit-transform: translate3d(-100vw, 150vh, 0) scale(0.1);
          transform: translate3d(-100vw, 150vh, 0) scale(0.1);
  border: 10px dashed rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
}
.modal-body .modal-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  color: #fff;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.modal-body.active-in-component {
  width: 100vw;
  -webkit-transform: translate3d(0px, 0px, 0px) scale(1);
          transform: translate3d(0px, 0px, 0px) scale(1);
}
.modal-body .modal-close {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 2vh;
  right: 1vw;
  padding: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-body .modal-close:before {
  content: "OR ESC KEY";
  text-align: center;
  font-size: 10px;
  transition: 50ms;
}
.modal-body .modal-close:hover:before {
  opacity: 1;
  font-size: 12px;
}
.modal-body .modal-close:hover i {
  opacity: 0.7;
  color: #fff;
  -webkit-transform: rotate(270deg) scale(1);
          transform: rotate(270deg) scale(1);
}
.modal-body .modal-close:active i {
  -webkit-transform: rotate(270deg) scale(2);
          transform: rotate(270deg) scale(2);
}
.modal-body .modal-close i {
  position: relative;
  font-size: 6vw;
  transition: 300ms;
}



</style>

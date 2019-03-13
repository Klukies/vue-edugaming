<template>
  <div id="app">
    <login-modal @close="closeModal" v-show="isModalVisible"></login-modal>
    <app-header @clickedLoginModal="showLoginModal()" class="body"></app-header>
    <div class="body" v-if="$auth.ready()">
      <router-view/>
    </div>

  </div>
</template>

<script>
import Header from './components/Header';
import Authentication from './components/Authentication.vue';

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'login-modal': Authentication,
  },
  data() {
    return {
      isModalVisible: false
    }
  },
  methods: {
    showLoginModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400');

*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  font-family: 'Roboto' , sans-serif;
  font-weight: 300;
  color: #3A55B4;
  width: 100%;

}

h1, h2, h3 {
  font-weight: 400;
}

.hidden {
  display: none;
}
</style>

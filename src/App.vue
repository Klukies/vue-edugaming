<template>
  <div id="app">
    <login-modal @close="closeModal" v-show="isModalVisible"></login-modal>
    <app-header @clickedLoginModal="showLoginModal()"></app-header>
    <div v-if="$auth.ready()">
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.hidden {
  display: none;
}
</style>

<template>
  <div id="app">
    <login-modal @close="closeModal" v-show="isModalVisible"></login-modal>
    <app-header @clickedLoginModal="showLoginModal()"></app-header>
    <div class="body" v-if="$auth.ready()">
      <router-view/>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Authentication from './components/Authentication.vue';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'login-modal': Authentication,
    'app-footer': Footer,
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

.body {
  padding-top: 12vh;
}

h1, h2, h3 {
  font-weight: 400;
}

h2 {
  font-size: 2.2rem;
  margin-bottom: 2vh;
}

article {
  padding-top: 6vh;
  padding-bottom: 6vh;
  font-size: 1.3rem;
  line-height: 2.5vh;
}

.article-wrapper {
  width: 38vw;
  margin-left: auto;
  margin-right: auto;
}

article:nth-child(even) {
  color: #FFF;
  background-color: #3A55B4;
}

.btn {
  background-color: #1F337B;
  color: #FFF;
  padding: 8px;
  border-radius: 3px;
  text-decoration: none;
}

.hidden {
  display: none;
}
</style>

<template>
  <div id="app">
    <AuthenticationComponent @close="closeModal" v-show="isModalVisible"></AuthenticationComponent>
    <HeaderComponent @clickedLoginModal="showLoginModal()"></HeaderComponent>
    <div class="body" v-if="$auth.ready()">
      <router-view/>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from './components/layout/HeaderComponent.vue';
import AuthenticationComponent from './components/AuthenticationComponent.vue';
import FooterComponent from './components/layout/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    'HeaderComponent': HeaderComponent,
    'AuthenticationComponent': AuthenticationComponent,
    'FooterComponent': FooterComponent,
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
  min-height: 86vh;
}

#coaches, .coach-full {
  padding-top: 4vh;
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

button {
  font: inherit;
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
  cursor: pointer;
}

.hidden {
  display: none;
}

.datetimepicker .datepicker {
  border-radius: 3px !important;
}
</style>

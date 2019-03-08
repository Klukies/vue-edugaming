<template>
    <header>
      <div id="header-logo">
        <img src="../assets/finished_logo.png" />
        EduGaming
      </div>
      <div id="header-navigation">
        <nav>
          <ul>
            <li>
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </li>
            <li>
              <a v-on:click="showLoginModal">Login</a>
            </li>
            <li>
              <a href="#"></a>
            </li>
            <li>
              <!--<router-link :to="{ name: 'Login' }">Login</router-link>-->
            </li>
          </ul>
        </nav>
      </div>
    </header>


</template>

<script>
import Authentication from './Authentication'

  export default {
    name: 'Header',
    methods: {
      showLoginModal() {
        this.$emit('clickedLoginModal');
      }
    }
}
</script>

<style>
</style>

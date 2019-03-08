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
              <router-link to="{ name: 'Home'}">Home</router-link>
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
      <register-modal></register-modal>
    </header>
</template>

<script>
import Register from './auth/Register'
  export default {
    name: 'Header',
    components: {
      'register-modal': Register
    }
  }
</script>

<style>
</style>

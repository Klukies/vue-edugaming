<template>
    <header>
      <div id="header-logo">
        <img src="../assets/finished_logo.png" />
        <h1>EduGaming</h1>
      </div>
      <div id="header-navigation">
        <nav>
          <ul>
            <li>
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </li>
            <li>
              <a href="#">Coaches</a>
            </li>
            <li>
              <a v-if="!$auth.check()" @click="showLoginModal">Login</a>
              <a v-else @click.prevent="$auth.logout()">Logout</a>
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

<style scoped>
header {
  height: 12vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-left: 3vw;
}

#header-logo, #header-navigation {
  text-align: left;
  display: flex;
  align-items: center;
}

h1 {
  font-size: 2.5rem;
  padding-left: 1vw;
}

#header-navigation {
  width: 30vw;
}

nav {
  width: 100%;
}

nav ul {
  display: flex;
  justify-content: space-between;
}

nav ul li {
  font-size: 1.6rem;
}

</style>

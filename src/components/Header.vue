<template>
    <header>
      <div id="header-logo">
        <img src="../assets/images/finished_logo.png" />
        <h1>EduGaming</h1>
      </div>
      <div id="header-navigation">
        <nav>
          <ul>
            <li>
              <router-link :to="{ name: 'Home' }">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Coaches' }">Coaches</router-link>
            </li>
            <li>
              <a v-if="!$auth.check()" @click="showLoginModal">Login</a>
              <a v-else @click.prevent="$auth.logout()">Logout</a>
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
  position: fixed;
  background-color: #FFF;
  z-index: 100;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.35);
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
  margin-right: 2vw;
}

nav {
  width: 100%;
  text-align: center;
}

nav ul {
  display: flex;
  justify-content: space-between;
}

nav ul li {
  font-size: 1.6rem;
}

nav a {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  width: 100%;
  position: relative;
}

nav a::after {
  height: 2px;
  width: 100%;
  background: #3A55B4;
  content: "";
  position: absolute;
  left: 0px;
  bottom: -2px;
  transform: scaleX(0);
  transition: 0.3s;
}

nav a:hover::after {
  transform: scaleX(1);
}

.router-link-exact-active {
  border-bottom: 2px solid #3A55B4;
}

</style>

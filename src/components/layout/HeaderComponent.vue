<template>
<header>
  <div id="header-logo">
    <img src="../../assets/images/logo.png" alt="logo of EduGaming"/>
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
          <a v-else @click.prevent="$auth.logout({redirect:null})">Logout</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  methods: {
    showLoginModal() {
      this.$emit('clickedLoginModal');
    }
  },
}
</script>

<style scoped src='./../../assets/css/header.css'>
</style>

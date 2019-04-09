<template>
  <footer>
    <div class="footer-wrapper">
      <div class="logo">
        <img src="../assets/images/finished_logo.png"/>
      </div>
      <a :href="`mailto:${infoMail}`">{{ infoMail }}</a>
      <a :href="`tel:${infoPhone}`">{{ infoPhone }}</a>
      <div class="social-media">
        <img src="../assets/images/facebook.png" alt="facebook"/>
        <img src="../assets/images/twitter.png" alt="twitter"/>
        <img src="../assets/images/instagram.png" alt="instagram"/>
        <img src="../assets/images/twitch.png" alt="twitch"/>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      infoMail: "info@edugaming.be",
      infoPhone: "+32 499 12 34 56",
    }
  }
}
</script>

<style scoped>
  footer {
    box-sizing: content-box;
    background-color: #1F337B;
    padding-top: 1vh;
    padding-bottom: 1vh;
    width: 100%;
  }

  .fixed {
    position: fixed;
    bottom: 0vh;
  }

  .footer-wrapper, .logo, .social-media {
    margin-left: auto;
    margin-right: auto;
  }

  .footer-wrapper {
    width: 20vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    text-align: center;
  }

  .logo {
    max-width: 4vw;
  }

  .logo img {
    width: 100%;
  }

  .social-media {
    display: flex;
    justify-content: space-between;
  }

  .social-media img {
    max-width: 40px;
    margin-right: 1vw;
  }

  a {
    color: white;
    text-decoration: none;
    margin-bottom: 1vh;
  }

  a:hover {
    text-decoration: underline;
  }
</style>

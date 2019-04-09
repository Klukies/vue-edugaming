<template>
  <footer>
    <div class="footer-wrapper">
      <div class="logo">
        <img src="../../assets/images/finished_logo.png"/>
      </div>
      <a :href="`mailto:${infoMail}`">{{ infoMail }}</a>
      <a :href="`tel:${infoPhone}`">{{ infoPhone }}</a>
      <div class="social-media">
        <img src="../../assets/images/facebook.png" alt="facebook"/>
        <img src="../../assets/images/twitter.png" alt="twitter"/>
        <img src="../../assets/images/instagram.png" alt="instagram"/>
        <img src="../../assets/images/twitch.png" alt="twitch"/>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      infoMail: "info@edugaming.be",
      infoPhone: "+32 499 12 34 56",
    }
  }
}
</script>

<style scoped>
@import './../../assets/css/footer.css';
</style>

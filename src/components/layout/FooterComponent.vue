<template>
  <footer>
    <div class="footer-wrapper">
      <div class="logo">
        <img src="../../assets/images/finished_logo.png"/>
      </div>
      <a :href="`mailto:${infoMail}`">{{ infoMail }}</a>
      <a :href="`tel:${infoPhone}`">{{ infoPhone }}</a>
      <div class="social-media">
        <div class="social-media-wrapper">
          <img src="../../assets/images/facebook.png" alt="facebook"/>
        </div>
        <div class="social-media-wrapper">
          <img src="../../assets/images/twitter.png" alt="twitter"/>
        </div>
        <div class="social-media-wrapper">
          <img src="../../assets/images/instagram.png" alt="instagram"/>
        </div>
        <div class="social-media-wrapper">
          <img src="../../assets/images/twitch.png" alt="twitch"/>
        </div>
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

<style scoped src='./../../assets/css/footer.css'>
</style>

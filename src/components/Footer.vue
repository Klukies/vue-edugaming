<template>
  <footer>
    <img src="../assets/finished_logo.png"/>
    <a :href="`mailto:${infoMail}`">{{ infoMail }}</a>
    <a :href="`tel:${infoPhone}`">{{ infoPhone }}</a>
    <div class="social-media">

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

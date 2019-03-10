<template>
  <div id="home">
    <div v-for="banner of banners" id="banners">
      <div class="banner">
        <img :src="banner.img_url" />
      </div>
    </div>
    <div>
      {{ $auth.user().email }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      errors: []
    }
  },

  created() {
    this.axios.get('/home')
    .then(response => {
      this.banners = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

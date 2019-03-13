<template>
  <div id="home">
    <transition-group class="banners" tag="div">
      <div v-for="banner of banners" class="banner" :key="banner.id">
          <img :src="banner.img_url" />
      </div>
    </transition-group>
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
      errors: [],
      sliding: null,
    }
  },

  created() {
    this.axios.get('/home')
    .then(response => {
      this.banners = response.data;
      this.slideBanner();
    })
    .catch(e => {
      this.errors.push(e)
    });
  },
  methods: {
    slideBanner() {
      this.sliding = setInterval(() => {
          this.next();
      }, 5000)
    },
    next() {
      const first = this.banners.shift();
      this.banners = this.banners.concat(first);
    }
  },
  beforeDestroy() {
    clearInterval(this.sliding);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banners {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100vw;
  height: 70vh;
}

.banner {
  transition: transform 0.5s ease-in-out;
}

.banner:first-of-type {
  opacity: 0;
}

.banner:last-of-type {
  opacity: 0;
}

.banner img {
  height: 100%;
  margin: auto;
}

</style>

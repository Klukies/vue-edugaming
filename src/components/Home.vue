<template>
  <div id="home">
    <div class="banners_wrapper">
      <transition-group class="banners" tag="div">
        <div v-for="banner of banners" class="banner" :key="banner.id">
            <img :src="banner.img_url" />
        </div>
      </transition-group>
      <button class='pause_play' v-bind:class="{playing: isPlaying}" @click="stopSliding"></button>
    </div>
    <article class="method">
      <h2>Method</h2>
      <p>
        EduGaming coaches aren't just coaches - they're mentors.
        Every single instructor on our platform has passed our rigorous,
        5-stage application process. We guarantee our pros aren't just top gamers,
        but also experienced teachers who will help you learn efficiently and effectively.
      </p>
    </article>
    <article class="featured-coaches">

    </article>
    <article class="reviews">

    </article>
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
      isPlaying: true,
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
    },
    stopSliding() {
      this.isPlaying = !this.isPlaying;
      if(!this.isPlaying) {
        clearInterval(this.sliding);
      } else {
        this.slideBanner();
      }
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

.pause_play {
  background: transparent;
  box-sizing: border-box;
  height: 74px;
  border-color: transparent transparent transparent #FFF;
  transition: 100ms all ease;
  cursor: pointer;
  border-style: solid;
  border-width: 37px 0 37px 60px;
  position: relative;
  bottom: 8vh;
  left: 50%;
  transform: translate(-50%, 0);
}

.playing {
  border-style: double;
  border-width: 0px 0 0px 60px;
}

.pause_play:hover {
  border-color: transparent transparent transparent #1F337B;
}


</style>

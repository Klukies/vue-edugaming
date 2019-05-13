<template>
  <div id="home">
    <div class="banners-wrapper">
      <transition-group class="banners" tag="div">
        <div v-for="banner of banners" class="banner" :key="banner.game_id">
            <img v-if="!isIos" :src="banner.img_url" @click='stopSliding' :alt='banner.title'>
            <img v-else :src="banner.old_browser_img_url" @click='stopSliding' :alt='banner.title'>
        </div>
      </transition-group>
      <button aria-label="pause_play_button" class='pause_play'  v-bind:class="{playing: isPlaying}" @click="stopSliding"></button>
    </div>
    <article class="method">
      <div class="article-wrapper">
        <h2>Method</h2>
        <p>
          EduGaming coaches aren't just coaches - they're mentors.
          Every single instructor on our platform has passed our rigorous application process.<br />
          We guarantee our pros aren't just top gamers,
          but also experienced teachers who will help you learn efficiently and effectively.
        </p>
      </div>
    </article>
    <article class="featured-coaches">
      <div class="article-wrapper">
        <h2>Featured coaches:</h2>
        <ul class="coaches">
          <li class="coach" v-for="coach of coaches" :key='coach.id'>
            <router-link :to="{ name: 'Coach', params: { username: coach.username } }" class="coach-link">
              <h3>{{ coach.username }}</h3>
              <figure>
                <div class="figure-img">
                  <img :src="coach.img_url" :alt='coach.username'/>
                </div>
                <figcaption v-if='coach.summary !== null'>
                  {{ coach.summary }}
                </figcaption>
                <figcaption v-else>Coach hasn't given a summary yet.</figcaption>
              </figure>
            </router-link>
          </li>
        </ul>
        <router-link :to="{ name: 'Coaches' }" class="btn">Find my coach</router-link>
      </div>
    </article>
    <article class="reviews">
      <div class="article-wrapper">
        <h2>What players are saying:</h2>
        <ul class="player-reviews">
            <ReviewComponent
            :review="review"
            v-for="review in reviews"
            :key="review.review_id">
            </ReviewComponent>
        </ul>
      </div>
    </article>
  </div>
</template>

<script>
import ReviewComponent from '@/components/ReviewComponent.vue';
export default {
  name: 'Home',
  components: {
    ReviewComponent
  },
  data() {
    return {
      banners: [],
      coaches: [],
      reviews: [],
      sliding: null,
      isPlaying: true,
      isIos: false,
    }
  },

  created() {
    this.axios.get('/home')
    .then(response => {
      this.banners = response.data.games;
      this.coaches = response.data.coaches;
      this.reviews = response.data.reviews;
      this.slideBanner();
    })
    .catch(e => {console.error(e)});
    if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      this.isIos = true;
    }
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
<style scoped src='./../assets/css/home.css'>
</style>

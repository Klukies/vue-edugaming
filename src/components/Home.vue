<template>
  <div id="home">
    <div class="banners-wrapper">
      <transition-group class="banners" tag="div">
        <div v-for="banner of banners" class="banner" :key="banner.game_id">
            <img :src="banner.img_url" />
        </div>
      </transition-group>
      <button class='pause_play' v-bind:class="{playing: isPlaying}" @click="stopSliding"></button>
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
        <ul v-for="coach of coaches" class="coaches">
          <li class="coach">
            <h3>{{ coach.username }}</h3>
            <figure>
              <img :src="coach.img_url" />
              <figcaption>
                {{ coach.summary }}
              </figcaption>
            </figure>
          </li>
        </ul>
        <router-link :to="{ name: 'Coaches' }" class="btn">Find my coach</router-link>
      </div>
    </article>
    <article class="reviews">
      <div class="article-wrapper">
        <h2>What players are saying:</h2>
      </div>
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
      coaches: [],
      errors: [],
      sliding: null,
      isPlaying: true,
    }
  },

  created() {
    this.axios.get('/home')
    .then(response => {
      this.banners = response.data.games;
      this.coaches = response.data.coaches;
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
.banners-wrapper {
  height: 88vh;
  box-sizing: content-box;
  padding-top: 12vh;
}

.banners {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: inherit;
}

.banner {
  transition: transform 0.5s ease-in-out;
  height: inherit;
}

.banner:first-of-type {
  opacity: 0;
}

.banner:last-of-type {
  opacity: 0;
}

.banner img {
  height: inherit;
  width: 100vw;
  margin: auto;
  object-fit: cover;
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
  bottom: 10vh;
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

h3 {
  margin-bottom: 2vh;
}

ul {
  margin-bottom: 3vh;
  display: flex;
  justify-content: space-between;
}

figure {
  width: 50%;
  display: flex;
}

figure img {
  max-width: 30%;
  margin-right: 1vw;
  border-radius: 3px;
}

figcaption {
  font-size: 1rem;
}

</style>

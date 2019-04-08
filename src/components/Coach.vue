<template>
  <div class="coach">
    <router-link :to="{ name: 'coach', params: {username: coach.username} }">
      <div class="coach-header">
        <div class="rating">
          <div v-if="showCoach">
            <img v-for="(n, index) in parseInt(coach.average_rating)" src="../assets/star.png" />
          </div>
          <p v-else>Unrated</p>
        </div>
        <div class="price">
          <p>€{{ coach.price }}/hr</p>
        </div>
      </div>
      <figure>
        <img :src="coach.img_url" v-bind:alt="coach.username" />
        <figcaption>
          {{ coach.username }}
        </figcaption>
      </figure>
      <p>{{ coach.summary }}</p>
    </router-link>
  </div>
</template>


<script>
export default {
  name: 'Coach',
  props: {
    coach: Object,
  },

  data() {
    return {
      showCoach: false,
    }
  },

  created() {
    if (this.coach.average_rating !== null) {
      this.showCoach = true;
    }
  }
}
</script>

<style scoped>
.coach {
  border: 1px solid #3A55B4;
  border-radius: 3px;
  width: 25%;
  margin-right: 3vw;
  padding-bottom: 2vh;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.35);
}

.coach .rating {
  padding-left: 1vw;
  padding-right: 1vw;
}

.coach a > p {
  font-size: 0.9rem;
  text-align: center;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
}

.coach a {
  text-decoration: none;
  color: #3A55B4;
}

.coach-header {
  display: flex;
  margin-bottom: 1vh;
}

.rating {
  width: 70%;
  padding-top: 0.75vh;
  padding-bottom: 0.75vh;
}

.price {
  width: 30%;
  background-color: #3A55B4;
  color: #FFF;
  padding-top: 0.75vh;
  padding-bottom: 0.75vh;
}

.price p {
  text-align: center;
}

figure {
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  margin-bottom: 1vh;
}

figure img {
  width: 100%;
  border-radius: 50%;
}

figcaption {
  text-align: center;
}
</style>

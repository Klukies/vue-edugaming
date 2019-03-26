<template>
  <div class="coach">
    <div class="coach-header">
      <div class="rating">
        <div v-if="coach.average_rating !== null">
          <img v-for="(n, index) in parseInt(coach.average_rating)" src="../assets/star.png"/>
        </div>
        <p v-else>Unrated</p>
      </div>
      <div class="price">
        <p>€{{ coach.price }}/hr</p>
      </div>
    </div>
    <figure>
      <img :src="coach.img_url" v-bind:alt="coach.username"/>
      <figcaption>
        {{ coach.username }}
      </figcaption>
    </figure>
    <p>{{ coach.summary }}</p>
  </div>
</template>

<script>
export default {
  name: 'Coach',
  props: {
    coach: Object,
  },

  methods: {

  }
}
</script>

<style scoped>
.coach {
  border: 1px solid #3A55B4;
  border-radius: 3px;
  height: 45%;
  width: 25%;
  margin-right: 3vw;
  padding-left: 1vw;
}

.coach-header {
  display: flex;
}

.rating {
  width: 75%;
  padding-top: 0.75vh;
  padding-bottom: 0.75vh;
}

.price {
  width: 25%;
  background-color: #3A55B4;
  color: #FFF;
  padding-top: 0.75vh;
  padding-bottom: 0.75vh;
  text-align: center;
}

figure {
  padding-left: 1vw;
  padding-right: 1vw;
  width: 100%;
}
</style>

<template>
  <div class="coach">
    <router-link :to="{ name: 'Coach', params: {username: coach.username} }">
      <div class="coach-header">
        <div class="rating">
          <div v-if="showCoach">
            <img v-for="(n, index) in parseInt(coach.average_rating)" src="../assets/images/star.png" />
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
  name: 'CoachListComponent',
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
@import './../assets/css/coachList.css';
</style>

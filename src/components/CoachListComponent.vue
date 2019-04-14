<template>
  <div class="coach">
    <router-link :to="{ name: 'Coach', params: {username: coach.username} }">
      <div class="coach-header">
        <div class="rating">
          <div v-if="showCoach">
            <StarRatingComponent
            :increment="0.01"
            :show-rating="false"
            :star-size="18"
            :rating="parseFloat(coach.average_rating)"
            :read-only="true">
            </StarRatingComponent>
          </div>
          <p v-else>Unrated</p>
        </div>
        <div class="price">
          <p>€{{ coach.price }}/hr</p>
        </div>
      </div>
      <figure>
        <img :src="coach.img_url" :alt="coach.username" />
        <figcaption>
          {{ coach.username }}
        </figcaption>
      </figure>
      <p v-if='coach.summary !== null'>{{ coach.summary }}</p>
      <p v-else>Coach hasn't given a summary yet.</p>
    </router-link>
  </div>
</template>


<script>
import StarRating from 'vue-star-rating';

export default {
  name: 'CoachListComponent',
  components: {
    "StarRatingComponent": StarRating
  },
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

<style scoped src='./../assets/css/coachList.css'>
</style>

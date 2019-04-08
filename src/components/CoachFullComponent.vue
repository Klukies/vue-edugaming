<template>
  <div class="coach-full">
    <div class="coach-header">
      <div class="coach-image">
        <img :src="coach.img_url"/>
      </div>
      <div class="coach-summary">
        <h2>{{ coach.username }}</h2>
        <div class="rating">
          <div v-if="showRating">
            <img v-for="(n, index) in parseInt(coach.average_rating)" src="../assets/star.png" />
          </div>
          <h3 v-else>Unrated</h3>
        </div>
        <p>{{ coach.summary }}</p>
      </div>
    </div>
    <div class="coach-profile">
      <h2>Coach Profile</h2>
      <p v-if="coach.description !== null">{{ coach.description }}</p>
      <p v-else>Coach hasn't given a description to his profile yet</p>
    </div>
    <div class="reservation">
      <p v-show='reservationMessage !== ""' class="reservation-message">{{ this.reservationMessage}} </p>
      <p v-show='reservationError !== ""' class="reservation-error">{{ this.reservationError }}</p>
      <VueCtkDateTimePicker
      v-model="reservation"
      v-bind:inline="true"
      v-bind:minuteInterval="30"
      v-bind:minDate="dateNow"
      v-bind:format="'YYYY-MM-DD HH:mm'"
      v-bind:color="'#1F337B'"
      id="calendar">
      </VueCtkDateTimePicker>
      <a @click.prevent="makeReservation" class="btn">Reserve my coach</a>
    </div>
    <div class="reviews">
      <h2>Reviews</h2>
      <ul class="review-list" v-if='reviews.length'>
        <review-component
          v-bind:review="review"
          v-for="review in reviews"
          :key="review.review_id">
          </review-component>
      </ul>
      <p v-else class="no-reviews">Coach doesn't have any reviews yet.</p>
      <a @click.prevent='makeReview' class="btn">Leave a review</a>
    </div>
  </div>
</template>

<script>
import ReviewComponent from './ReviewComponent.vue';

export default {
  name: 'CoachFullComponent',
  components: {
    'review-component': ReviewComponent
  },

  data() {
    return {
      coach: [],
      reservation: '',
      reservationError: '',
      reservationMessage: '',
      showRating: false,
      dateNow: this.getDate(),
      reviews: [],
    }
  },

  props: {
    reservationProps: {
      inline: true,
    },
  },

  created() {
    this.axios.get(`/coaches/${this.$route.params.username}`)
    .then(response => {
      this.coach = response.data[0];
      if (this.coach.average_rating !== null) {
        this.showRating = true;
      }
    })
    .catch(error => {console.log(error)});
  },

  methods: {
    makeReservation() {
      if (this.reservation === '') {
        this.reservationError = 'No date given, please select a date and time.'
      } else {
        this.reservationError = '';
        this.axios.post(`/reservation`, {
          coach_id: this.coach.coach_id,
          reservation_time: this.reservation,
        })
        .then(response => {this.reservationMessage = response.data.message;})
        .catch(err => console.error(err));
      }
    },
    getDate() {
      const toTwoDigits = num => num < 10 ? '0' + num : num;
      let today = new Date();
      let year = today.getFullYear();
      let month = toTwoDigits(today.getMonth() + 1);
      let day = toTwoDigits(today.getDate());
      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<style scoped>
.coach-full {
  width: 60vw;
  margin-left: auto;
  margin-right: auto;
}

.coach-header, .coach-profile, .reservation {
  margin-bottom: 5vh;
}

.coach-header {
  display: flex;
}

.coach-image {
  max-width: 300px;
  margin-right: 1vw;
}

.rating, .reviews {
  margin-bottom: 2vh;
}

.coach-image img {
  width: 100%;
}

#calendar, .reservation-error, .reservation-message, .no-reviews {
  margin-bottom: 2vh;
}

.reservation-error, .reservation-message {
  font-weight: bold;
}

.reservation-error {
  color: red;
}

.reservation-message {
  color: green;
}
</style>

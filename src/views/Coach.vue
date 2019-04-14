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
              <StarRatingComponent
              :increment="0.01"
              :show-rating="false"
              :star-size="25"
              :rating="parseFloat(coach.average_rating)"
              :read-only="true">
              </StarRatingComponent>
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
      :inline="true"
      :minuteInterval="30"
      :minDate="dateNow"
      :format="'YYYY-MM-DD HH:mm'"
      :color="'#1F337B'"
      :no-keyboard="true"
      id="calendar">
      </VueCtkDateTimePicker>
      <a @click.prevent="makeReservation" class="btn">Reserve my coach</a>
    </div>

    <div class="reviews">
      <h2>Reviews</h2>
      <ul class="review-list" v-if='showReviews'>
        <ReviewComponent
        :review="review"
        v-for="review in reviews"
        :key="review.review_id">
        </ReviewComponent>
      </ul>
      <p v-else class="no-reviews">Coach doesn't have any reviews yet.</p>
      <a @click.prevent='makeReview' class="btn">Leave a review</a>
      <CreateReviewComponent
      @closeReviewModal="closeReviewModal()"
      @sendReview="sendReview($event)"
      v-show="showCreateForm"></CreateReviewComponent>
    </div>

  </div>
</template>

<script>
import ReviewComponent from '@/components/ReviewComponent.vue';
import CreateReviewComponent from '@/components/CreateReviewComponent';
import StarRating from 'vue-star-rating';

export default {
  name: 'Coach',
  components: {
    ReviewComponent,
    CreateReviewComponent,
    'StarRatingComponent': StarRating
  },

  data() {
    return {
      coach: [],
      reviews: [],
      reservation: '',
      reservationError: '',
      reservationMessage: '',
      showRating: false,
      showReviews: false,
      dateNow: this.getDate(),
      showCreateForm: false,
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
      this.reviews = this.coach.reviews;
      if (this.coach.average_rating !== null) {
        this.showRating = true;
      }
      if (this.reviews.length) {
        this.showReviews = true;
      }
    })
    .catch(error => {console.log(error)});
  },

  methods: {
    makeReservation() {
      if (this.$auth.token() === null) {
        this.$emit('showLoginModal');
      } else if (this.reservation === '') {
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
    },
    makeReview() {
      if (this.$auth.token() === null) {
        this.$emit('showLoginModal');
      } else {
        this.showCreateForm = !this.showCreateForm;
      }
    },
    closeReviewModal() {
      this.showCreateForm = !this.showCreateForm;
    },
    sendReview(reviewData) {
      this.axios.post(`/review`, {
        coach_id: this.coach.coach_id,
        rating: reviewData.rating,
        review: reviewData.review
      })
      .then(response => {
        this.reviews = response.data;
        this.closeReviewModal();
      })
      .catch(err => {
        if (err.response.data.error === 'Token not provided') {
          console.log("omegalul");
        }
      });
    }
  }
}
</script>

<style scoped src='./../assets/css/coach.css'>
</style>

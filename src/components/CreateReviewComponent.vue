<template>
<div class="modal-backdrop">
  <div class="review-modal modal">
    <div class="modal-header">
      <h2>Review</h2>
      <StarRatingComponent
      :star-size="30"
      :show-rating="false"
      v-model="rating">
      </StarRatingComponent>
    </div>
    <span>{{ reviewErrors[reviewErrors.length -1] }}</span>
    <div class="review-form">
      <form autocomplete="off" @submit.prevent="validateReview" method="post">
        <div class="form-field">
          <textarea
          placeholder="Write your review here"
          v-model="review"></textarea>
        </div>
        <div class="buttons">
          <a href="#" @click.prevent="closeReviewModal" class="btn">Cancel</a>
          <button type="submit" class="btn confirm-button">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  name: 'CreateReviewComponent',
  components: {
    "StarRatingComponent": StarRating
  },
  data() {
    return {
      review: '',
      rating: -1,
      reviewErrors: [],
    }
  },

  methods: {
    closeReviewModal() {
      this.review = '',
      this.rating = -1,
      this.reviewErrors = [],
      this.$emit('closeReviewModal');
    },
    validateReview() {
      if (this.rating === -1) {
        this.reviewErrors.push("No rating given");
      } else if (this.review === "") {
        this.reviewErrors.push("No review given");
      } else {
        this.reviewErrors = [];
        const reviewData = {
          review: this.review, rating: this.rating
        };
        this.$emit('sendReview', reviewData);
      }
    }
  }
}
</script>

<style scoped src='./../assets/css/createReviewComponent.css'>
</style>

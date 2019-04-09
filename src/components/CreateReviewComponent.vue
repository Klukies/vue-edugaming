<template>
<div class="modal-backdrop">
  <div class="review-modal modal">
    <div class="modal-header">
      <h2>Review</h2>
      <p>Rating</p>
    </div>
    <div class="review-form">
      <form autocomplete="off" @submit.prevent="create-review" method="post">
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
export default {
  name: 'CreateReviewComponent',
  data() {
    return {
      review: '',
      rating: '',
    }
  },

  methods: {
    closeReviewModal() {
      this.review = '',
      this.rating = '',
      this.$emit('closeReviewModal');
    },
    edit($event) {
      console.log('typing');
      console.log($event.target.value);
      this.review = $event;
    }
  }
}
</script>

<style scoped>
@import './../assets/css/createReviewComponent.css';
</style>

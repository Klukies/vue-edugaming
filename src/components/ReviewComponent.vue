<template>
<li class="review">
  <div class="review-header">
    <h3>{{ review.author.name }}</h3>
    <p class="date">{{ review.created_at }}</p>
  </div>

  <div class="review-body">
    <p>{{ review.review }}</p>
  </div>
</li>
</template>

<script>
export default {
  name: 'ReviewComponent',
  props: {
    review: Object,
  }
}
</script>

<style scoped src='./../assets/css/reviewComponent.css'>
</style>

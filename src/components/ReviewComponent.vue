<template>
<div class="review-list">
  <p v-if='!review.length'>No review yet</p>
</div>
</template>

<script>
export default {
  name: 'ReviewComponent',
  data() {
    return {
      review: Object,
    }
  }
}
</script>

<style lang="css" scoped>
</style>

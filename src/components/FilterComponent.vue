<template>
  <div class="filters">
    <div class="filter" v-for="(filter, key) in filters">
      <p>{{ key }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComponent',

  data() {
    return {
      filters: []
    }
  },

  created() {
    this.axios.get('/filters')
    .then(response => {
      this.filters = response.data;
      console.log(this.filters.games);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style scoped>

</style>

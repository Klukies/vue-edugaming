<template>
  <div id="coaches">
    <div class="searchBar">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Coaches',
  data() {
    return {
      coaches: []
    }
  },

  created() {
    this.axios.get('/coaches')
    .then(response => {
      this.coaches = response.data.coaches;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
.coaches {
  padding-top: 12vh;
}
</style>

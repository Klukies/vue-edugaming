<template>
  <div id="coaches">
    <filter-component @filter="filter($event)"></filter-component>
    <ul>
      <li v-for="coach in coaches">
        <coach-component></coach-component>
      </li>
    </ul>
  </div>
</template>

<script>
import FilterComponent from './FilterComponent.vue';
import Coach from './Coach.vue';

export default {
  name: 'Coaches',
  components: {
    'filter-component': FilterComponent,
    'coach-component': Coach,
  },

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
  },
  methods: {
    filter(filters) {
      this.axios.post('/coaches/filter', {
        games: filters[0],
        price: filters[1],
        ratings: filters[2]
      })
      .then(response => {
        this.coaches = response.data.coaches;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <div id="coaches">
    <filter-component @filter="filter($event)"></filter-component>
    <div class="coaches-list">
      <coach-component
        v-bind:coach="coach"
        v-for="coach in coaches"
        :key="coach.coach_id"></coach-component>
    </div>
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
      this.coaches = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
    this.$emit('fixedFooter');
  },

  beforeDestroy() {
    this.$emit('fixedFooter');
  },

  methods: {
    filter(filters) {
      this.axios.post('/coaches/filter', {
        games: filters[0],
        price: filters[1],
        rating: filters[2]
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
#coaches {
  display: flex;
  width: 60vw;
  margin-left: auto;
  margin-right: auto;
}

.coaches-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

</style>

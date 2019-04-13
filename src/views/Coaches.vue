<template>
  <div id="coaches">
    <FilterComponent @filter="filter($event)"></FilterComponent>
    <div class="coaches-list">
      <CoachListComponent
        v-bind:coach="coach"
        v-for="coach in coaches"
        :key="coach.coach_id"></CoachListComponent>
    </div>
  </div>
</template>

<script>
import FilterComponent from '@/components/FilterComponent.vue';
import CoachListComponent from '@/components/CoachListComponent.vue';

export default {
  name: 'CoachesComponent',
  components: {
    'FilterComponent': FilterComponent,
    'CoachListComponent': CoachListComponent,
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
      console.error(err);
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
        this.coaches = response.data;
      })
      .catch((err) => {
        console.error(err);
      });
    },
  }
}
</script>

<style scoped src='./../assets/css/coaches.css'>
</style>

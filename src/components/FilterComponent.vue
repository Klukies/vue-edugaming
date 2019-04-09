<template>
  <div class="filters">
    <div class="filter" v-for="(filter, key) in filters">
      <h1>{{ key }}</h1>
      <ul v-if="key=='Games'">
        <li v-for="option in filter">
          <input @change="applyFilter" type="checkbox" :id="option.title" :value="option.game_id" v-model="gameToFilter"/>
          <label :for="option.title">{{ option.title }}</label>
        </li>
      </ul>
      <ul v-else-if="key=='Prices'" v-for="option in filter">
        <li v-for="(key,value) in option">
          <input @change="applyFilter" @click="unselectPrice(value)" type="radio" :id="key" :value="value" v-model="priceToFilter"/>
          <label :for="key">{{ key }}</label>
        </li>
      </ul>
      <ul v-else v-for="option in filter">
        <li v-for="value in option">
          <input @change="applyFilter" @click="unselectRating(value)" type="radio" :id="value" :value="value" v-model="ratingToFilter"/>
          <label :for="value">
            <img v-for="(n, index) in parseInt(value)" src="../assets/images/star.png">
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComponent',

  data() {
    return {
      filters: [],
      gameToFilter: [],
      priceToFilter: '',
      ratingToFilter: ''
    }
  },

  created() {
    this.axios.get('/filters')
    .then(response => {
      this.filters = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    unselectPrice(price) {
      if (price == this.priceToFilter) {
        this.priceToFilter = '';
        this.applyFilter();
      }
    },
    unselectRating(rating) {
      if (rating == this.ratingToFilter) {
        this.ratingToFilter = '';
        this.applyFilter();
      }
    },
    applyFilter() {
      this.$emit('filter', [this.gameToFilter, this.priceToFilter, this.ratingToFilter]);
    }
  }
}
</script>

<style scoped>
@import './../assets/css/filter.css';
</style>

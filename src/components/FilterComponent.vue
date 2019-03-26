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
          <input @change="applyFilter" type="radio" :id="key" :value="value" v-model="priceToFilter"/>
          <label :for="key">{{ key }}</label>
        </li>
      </ul>
      <ul v-else v-for="option in filter">
        <li v-for="value in option">
          <input @change="applyFilter" type="radio" :id="value" :value="value" v-model="ratingToFilter"/>
          <label :for="value">
            <img v-for="(n, index) in parseInt(value)" src="../assets/star.png">
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
    applyFilter() {
      //todo filter on null values
      this.$emit('filter', [this.gameToFilter, this.priceToFilter, this.ratingToFilter]);
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 2.2rem;
}

li {
  max-width: 10vw;
  display: flex;
}

li img {
  max-width: 20px;
}

a {
  cursor: pointer;
}
</style>

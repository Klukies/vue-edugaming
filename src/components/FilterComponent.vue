<template>
  <div class="filters">
    <div class="filter-desktop" v-if='!filterSelect'>
      <div class="filter" v-for="(filter, key) in filters" :key='key'>
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
              <StarRatingComponent
              :show-rating="false"
              :star-size="22"
              :inactive-color="'transparent'"
              :rating="parseInt(value)"
              :read-only="true">
              </StarRatingComponent>
            </label>
          </li>
        </ul>
      </div>
    </div>

    <div class="filter-mobile" v-else>
      <div class="filter-m" v-for="(filter, key) in filters" :key='key' >
        <h1>{{ key }}</h1>
        <ul v-if="key=='Games'">
          <li v-for="option in filter">

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';

export default {
  name: 'FilterComponent',
  components: {
    "StarRatingComponent": StarRating
  },
  data() {
    return {
      filters: [],
      gameToFilter: [],
      priceToFilter: '',
      ratingToFilter: -1,
      windowWidth: 0,
      filterSelect: false,
    }
  },

  watch: {
    windowWidth(newWidth) {
      if (newWidth <= 1280 && this.filterSelect === false) {
        this.filterSelect = true;
      } else if (newWidth > 1280 && this.filterSelect === true) {
        this.filterSelect = false;
      }
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
    if (window.innerWidth <= 1280) {
      this.filterSelect = true;
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      });
    })
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
        this.ratingToFilter = -1;
        this.applyFilter();
      }
    },
    applyFilter() {
      this.$emit('filter', [this.gameToFilter, this.priceToFilter, this.ratingToFilter]);
    }
  }
}
</script>

<style scoped src='./../assets/css/filter.css'>
</style>

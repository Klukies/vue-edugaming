<template>
  <div class="filters">
    <div class="filter-desktop" v-if='!filterSelect'>
      <div class="filter" v-for="(filter, key) in filters" :key='key'>
        <h1>{{ key }}</h1>
        <ul v-if="key=='Games'">
          <li v-for="option in filter" :key='option'>
            <input @change="applyFilter" type="checkbox" :id="option.title" :value="option.game_id" v-model="gameToFilter"/>
            <label :for="option.title">{{ option.title }}</label>
          </li>
        </ul>

        <ul v-else-if="key=='Prices'">
          <li v-for="(key, price) in filter" :key='key'>
            <input @change="applyFilter" @click="unselectPrice(price)"
            type="radio"
            :id="key"
            :value="price"
            v-model="priceToFilter"/>
            <label :for="key">{{ key }}</label>
          </li>
        </ul>

        <ul v-else>
          <li v-for="(key, rating) in filter" :key='key'>
            <input @change="applyFilter" @click="unselectRating(rating)"
            type="radio"
            :id="key"
            :value="rating"
            v-model="ratingToFilter"/>
            <label :for="key">
              <StarRatingComponent
              :show-rating="false"
              :star-size="22"
              :inactive-color="'transparent'"
              :rating="parseInt(key)"
              :read-only="true">
              </StarRatingComponent>
            </label>
          </li>
        </ul>
      </div>
    </div>

    <div class="filter-mobile" v-else>
      <div class="filter-m" v-for="(filter, key) in filters" :key='key'>
        <div class="select" v-if='key === "Games"'>
          <label class="mobile-label" :for='option.title'>{{ key }}</label>
          <select :id='option.title' @change='applyMobileFilter' v-model="mobileGameToFilter">
            <option selected="selected"
            value="">All</option>
            <option v-for='option in filter'
            :id='option.title'
            :value='option.game_id'
            :key='option.game_id'>{{ option.title }}</option>
          </select>
        </div>
        <div class="select" v-else-if='key === "Prices"'>
          <label class="mobile-label">{{ key }}</label>
          <select @change='applyMobileFilter' v-model="mobilePriceToFilter">
            <option value=null>All</option>
            <option v-for='(key, price) in filter'
            :id='price'
            :value='price'
            :key='key'>{{ key }}</option>
          </select>
        </div>
        <div class="select" v-else>
          <label class="mobile-label">{{ key }}</label>
          <select @change='applyMobileFilter' v-model="mobileRatingToFilter">
            <option value='-1'>All</option>
            <option v-for='rating in filter'
            :id='rating'
            :value='rating'
            :key='rating'>{{ rating }}</option>
          </select>
        </div>
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
      mobileGameToFilter: "",
      mobilePriceToFilter: null,
      mobileRatingToFilter: -1,
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
    },
    applyMobileFilter() {
      if (this.mobileGameToFilter === "") {
        this.$emit('filter', [[], this.mobilePriceToFilter, parseInt(this.mobileRatingToFilter)]);
      } else {
        this.$emit('filter', [[parseInt(this.mobileGameToFilter)], this.mobilePriceToFilter, parseInt(this.mobileRatingToFilter)]);
      }
    }
  }
}
</script>

<style scoped src='./../assets/css/filter.css'>
</style>

<template>
  <div class="coach-full">
    <div class="coach-header">
      <div class="coach-image">
        <img :src="coach.img_url"/>
      </div>
      <div class="coach-summary">
        <h2>{{ coach.username }}</h2>
        <div class="rating">
          <div v-if="showRating">
            <img v-for="(n, index) in parseInt(coach.average_rating)" src="../assets/star.png" />
          </div>
          <p v-else>Unrated</p>
        </div>
        <p>{{ coach.summary }}</p>
      </div>
    </div>
    <div class="coach-profile">
      <h3>Coach Profile</h3>
      <p v-if="coach.description !== null">{{ coach.description }}</p>
      <p v-else>Coach hasn't given a description to his profile yet</p>
    </div>
    <div class="reservation">
      <VueCtkDateTimePicker
      v-model="reservation"
      v-bind:inline="true"
      v-bind:minuteInterval="30"
      v-bind:minDate="dateNow"
      v-bind:format="'YYYY-MM-DD HH:mm'"
      v-bind:color="'#1F337B'"
      id="calendar"
      >
      </VueCtkDateTimePicker>
      <a @click.prevent="makeReservation" class="btn">Reserve my coach</a>
    </div>
    <div class="reviews">

    </div>
  </div>
</template>

<script>

export default {
  name: 'CoachFullComponent',
  data() {
    return {
      coach: [],
      reservation: '',
      showRating: false,
      dateNow: this.getDate()
    }
  },

  props: {
    reservationProps: {
      inline: true,
    },
  },

  created() {
    this.axios.get(`/coaches/${this.$route.params.username}`)
    .then(response => {
      this.coach = response.data[0];
      if (this.coach.average_rating !== null) {
        showRating = true;
      }
    })
    .catch(error => {
      console.log(error);
    });
  },

  methods: {
    makeReservation() {
      console.log(this.reservation);
    },
    getDate() {
      const toTwoDigits = num => num < 10 ? '0' + num : num;
      let today = new Date();
      let year = today.getFullYear();
      let month = toTwoDigits(today.getMonth() + 1);
      let day = toTwoDigits(today.getDate());
      return `${year}-${month}-${day}`;
    }
  }
}
</script>

<style scoped>
.coach-full {
  width: 60vw;
  margin-left: auto;
  margin-right: auto;
}
</style>

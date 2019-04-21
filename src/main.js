import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import VeeValidate from 'vee-validate'

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

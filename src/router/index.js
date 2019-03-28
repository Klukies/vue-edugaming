import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Home from '@/components/Home'
import Coaches from '@/components/Coaches'
import CoachFullComponent from '@/components/CoachFullComponent'

axios.defaults.baseURL = 'http://localhost:8000/api/'

Vue.use(Router)
Vue.use(VueAxios, axios)

const router = new Router ({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      }, {
        path: '/coaches',
        name: 'Coaches',
        component: Coaches
      }, {
        path: '/coaches/:username',
        name: 'coach',
        component: CoachFullComponent
      }
    ]
});

Vue.router = router;

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

export default router

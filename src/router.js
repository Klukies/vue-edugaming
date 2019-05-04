import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Home from './views/Home.vue'

//Girlfriend network
//axios.defaults.baseURL = 'https://192.168.0.153/api/'

//localhost
axios.defaults.baseURL = 'http://localhost:8000/api/'

//compbell
//axios.defaults.baseURL = 'https://laravel.lukas-cornille.be/api/'

Vue.use(Router)
Vue.use(VueAxios, axios)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/coaches',
      name: 'Coaches',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Coaches.vue')
    },
    {
      path: '/coaches/:username',
      name: 'Coach',
      component: () => import('./views/Coach.vue')
    }
  ]
})

Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

export default router

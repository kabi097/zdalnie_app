import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AdPage from './views/AdPage.vue'
import UserProfile from './views/UserProfile.vue'
import NewAdvertisement from './views/NewAdvertisement.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/example',
      name: 'example',
      // route level code-splitting]
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AdPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile
    },
    {
      path: '/new_advertisement',
      name: 'new_advertisement',
      component: NewAdvertisement
    }
  ]
})

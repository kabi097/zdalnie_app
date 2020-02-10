import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AdPage from './views/AdPage.vue'
import UserProfile from './views/UserProfile.vue'
import NewAdvertisement from './views/NewAdvertisement.vue'
import NotFound from './views/NotFound.vue'
import About from './views/About.vue'

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
      path: '/page/:page',
      name: 'pagination_home',
      component: Home
    },
    {
      path: '/category/:category_id',
      name: 'category',
      component: Home
    },
    {
      path: '/category/:category_id/page/:page',
      name: 'pagination_category',
      component: Home
    },
    {
      path: '/post/:post_id',
      name: 'post',
      component: AdPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/new_advertisement',
      name: 'new_advertisement',
      component: NewAdvertisement
    },
    {
      path: '/*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

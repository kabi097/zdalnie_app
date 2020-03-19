import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.http.headers.common['Access-Control-Allow-Origin'] = true

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

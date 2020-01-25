import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import 'material-design-icons-iconfont/dist/material-design-icons.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false
  },
  icons: {
    iconfont: 'mdi'
  }
})

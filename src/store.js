import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    posts: [],
    token: localStorage.getItem('access_token') || null,
    showRegisterForm: false,
    showLoginForm: false,
    loadingRegister: false,
    loadingLogin: false,
    snackbarText: '',
    snackbarColor: 'error'
  },
  getters: {
    allPosts: state => state.posts,
    loggedIn: state => state.token !== null
  },
  mutations: {
    GET_POSTS: (state, posts) => {
      state.posts = posts
    },
    CLEAR_WARNINGS: (state) => {
      state.warningRegister = ''
    },
    SET_FORM_REGISTER: (state, formRegister) => {
      state.showRegisterForm = formRegister
    },
    SET_FORM_LOGIN: (state, form) => {
      state.showLoginForm = form
    },
    SET_SNACKBAR: (state, text, color) => {
      state.snackbarText = text
      state.snackbarColor = color
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    getPosts ({ commit }) {
      axios.get('/api/posts').then(response => {
        commit('GET_POSTS', response.data)
      })
    },
    registerUser ({ commit, state }, user) {
      state.loadingRegister = true
      axios.post('/api/users', user).then(response => {
        state.loadingRegister = false
        this.dispatch('loginUser', {
          email: user.email,
          password: user.password
        })
      }).catch(error => {
        this.dispatch('setSnackbar', error.response.data.violations[0].message, 'error')
        state.loadingRegister = false
      })
    },
    loginUser ({ commit, state }, user) {
      state.loadingRegister = true
      axios.post('/login', user).then(response => {
        state.loadingLogin = false
        const token = response.data.token
        localStorage.setItem('access_token', token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        commit('SET_TOKEN', token)
        this.dispatch('toggleOverlay', false)
        this.dispatch('setSnackbar', 'Zalogowano pomyślnie')
        // setTimeout(() => {
        //   this.dispatch('logout')  
        // }, 100000)
      }).catch((error) => {
        state.loadingLogin = false
        this.dispatch('setSnackbar', error.response.data.message, 'error')
      })
    },
    toggleOverlay ({ commit, state }, toggle) {
      commit('SET_FORM_LOGIN', toggle)
      commit('SET_FORM_REGISTER', toggle)
    },
    openLoginForm ({ commit, state }) {
      commit('SET_FORM_LOGIN', true)
    },
    openRegisterForm ({ commit, state }) {
      commit('SET_FORM_REGISTER', true)
    },
    setSnackbar ({ commit, state }, text, color) {
      commit('SET_SNACKBAR', text, (color !== '') ? color : 'error')
      // setTimeout(() => {
      //   commit('SET_SNACKBAR', '', 'error')
      // }, 9999)
    },
    logout ({ state, commit }) {
      localStorage.removeItem('access_token')
      commit('SET_TOKEN', null)
    }
  }
})

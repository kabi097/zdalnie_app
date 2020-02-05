import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    posts: [],
    categories: [],
    // currentCategory: '',
    token: localStorage.getItem('access_token') || null,
    isAdmin: false,
    currentUser: localStorage.getItem('current_user') || null,
    showRegisterForm: false,
    showLoginForm: false,
    loadingRegister: false,
    loadingLogin: false,
    snackbarText: '',
    snackbarColor: 'error',
    newPost: {
      title: '',
      description: '',
      budget: '',
      category: '',
      user: '',
      days: ''
    }
  },
  getters: {
    allPosts: state => state.posts,
    allCategories: state => state.categories,
    loggedIn: state => state.token !== null,
    // currentCategory: state => state.currentCategory
  },
  mutations: {
    GET_POSTS: (state, posts) => {
      state.posts = posts
    },
    GET_CATEGORIES: (state, categories) => {
      state.categories = categories
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
    },
    SET_USER: (state, user, admin) => {
      state.isAdmin = admin
      state.currentUser = user
    },
    SET_NEW_POST: (state, post) => {
      state.newPost = post
    }
    // SET_CURRENT_CATEGORY: (state, category) => {
    //   state.currentCategory = category
    // }
  },
  actions: {
    getPosts ({ commit }, category) {
      const postAddress = (!!category) ? '/api/categories/' + category.match(/\d+/) + '/posts' : '/api/posts'
      axios.get(postAddress).then(response => {
        commit('GET_POSTS', response.data['hydra:member'])
      })
    },
    getCategories ({ commit, state }) {
      axios.get('/api/categories').then(response => {
        commit('GET_CATEGORIES', response.data['hydra:member'])
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
        const tokenData = jwt_decode(token)      
        commit('SET_USER', tokenData.id, tokenData.roles.includes('ROLE_ADMIN'))
        localStorage.setItem('access_token', token)
        localStorage.setItem('current_user', tokenData.id)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        commit('SET_TOKEN', token)
        this.dispatch('toggleOverlay', false)
        this.dispatch('setSnackbar', 'Zalogowano pomyślnie')
        this.dispatch('createPost')
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
      localStorage.removeItem('current_user')
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    },
    deletePost ({ state, commit }, id) {
      axios.delete('/api/posts/' + id.match(/\d+/)).then(response => {
        this.dispatch('setSnackbar', 'Pomyślnie usunięto wpis', '')
        location.reload()
      }).catch((error) => {
        this.dispatch('setSnackbar', error.response, '')
        console.log(error)
      })
    },
    createPost ({ state, commit }, post) {
      if (!post && !state.newPost) return
      if (state.token && state.currentUser) {
        axios.post('/api/posts', post || state.newPost).then(response => {
          commit('SET_NEW_POST', null)
        }).catch(error => {
          this.dispatch('setSnackbar', error.response, '')
        })
      } else {
        commit('SET_NEW_POST', post)
        this.dispatch('openLoginForm')
      }
    }
    // setCategory ({ state, commit }, category) {
    //   commit('SET_CURRENT_CATEGORY', category)
    //   this.dispatch('getPosts', category)
    // }
  }
})

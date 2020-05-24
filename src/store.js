import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import router from './router'
import qs from 'qs'

Vue.use(Vuex)
axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000'

const checkExpiredJWTPlugin = store => {
  store.subscribe((mutation, state) => {
    if (state.token) {
      if (Date.now() >= jwt_decode(localStorage.getItem('access_token')).exp * 1000) {
        store.dispatch('logout')
      }
    }
  })
}

export default new Vuex.Store({
  plugins: [checkExpiredJWTPlugin],
  state: {
    posts: [],
    postData: null,
    categories: [],
    userData: null,
    userPosts: null,
    userReplies: null,
    parameters: {
      page: 1,
      itemsPerPage: 10,
      isPublished: true,
      budget: {
        gte: null,
        lte: null
      },
      order: {
        createdAt: 'desc'
      }
    },
    paginationLength: 1,
    paginationLengthUserPosts: 1,
    paginationLengthUserReplies: 1,
    token: localStorage.getItem('access_token') || null,
    isAdmin: localStorage.getItem('access_token') && jwt_decode(localStorage.getItem('access_token')).roles.includes('ROLE_ADMIN'),
    currentUser: localStorage.getItem('current_user') || null,
    showRegisterForm: false,
    showLoginForm: false,
    showSelectCategory: false,
    showAddForm: false,
    showCategoriesBrowser: false,
    showWelcomeSettings: false,
    loadingLogin: false,
    newPostCategory: '',
    newPost: {
      title: '',
      description: '',
      budget: '',
      category: '',
      user: '',
      days: ''
    },
    editPost: null,
    notifications: []
  },
  getters: {
    allPosts: state => state.posts,
    allCategories: state => state.categories,
    loggedIn: state => !!state.token && !!state.currentUser,
    currentUser: state => state.currentUser,
    postData: state => state.postData,
    userData: state => state.userData,
    userPosts: state => state.userPosts,
    userReplies: state => state.userReplies,
    isAdmin: state => state.isAdmin,
    paginationLength: state => state.paginationLength,
    paginationLengthUserPosts: state => state.paginationLengthUserPosts,
    paginationLengthUserReplies: state => state.paginationLengthUserReplies,
    queryParams: state => state.parameters,
    editPost: state => state.editPost
  },
  mutations: {
    GET_POSTS: (state, posts) => {
      state.posts = posts
    },
    GET_USER_DATA: (state, user) => {
      state.userData = user
    },
    GET_POST_DATA: (state, post) => {
      state.postData = post
    },
    GET_USER_POSTS: (state, posts) => {
      state.userPosts = posts
    },
    GET_USER_REPLIES: (state, replies) => {
      state.userReplies = replies
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
    SET_SELECT_CATEGORY: (state, selectCategory) => {
      state.showSelectCategory = selectCategory
    },
    SET_FORM_LOGIN: (state, form) => {
      state.showLoginForm = form
    },
    SET_ADD_FORM: (state, addForm) => {
      state.showAddForm = addForm
    },
    SET_CATEGORIES_BROWSER: (state, browser) => {
      state.showCategoriesBrowser = browser
    },
    SET_NEW_POST_CATEGORY: (state, category) => {
      state.newPostCategory = category
    },
    SET_WELCOME_SETTINGS: (state, settings) => {
      state.showWelcomeSettings = settings
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, { user, admin }) => {
      state.isAdmin = admin
      state.currentUser = user
    },
    SET_NEW_POST: (state, post) => {
      state.newPost = post
    },
    SET_PAGINATION_LENGTH: (state, length) => {
      state.paginationLength = length
    },
    SET_PAGINATION_LENGTH_USER_REPLIES: (state, length) => {
      state.paginationLengthUserReplies = length
    },
    SET_PAGINATION_LENGTH_USER_POSTS: (state, length) => {
      state.paginationLengthUserPosts = length
    },
    SET_PAGE: (state, page) => {
      state.parameters.page = page
    },
    SET_ITEMS_PER_PAGE: (state, number) => {
      state.parameters.itemsPerPage = number
    },
    SET_MIN_BUDGET: (state, min) => {
      state.parameters.budget.gte = min
    },
    SET_MAX_BUDGET: (state, max) => {
      state.parameters.budget.lte = max
    },
    SET_ORDER: (state, order) => {
      state.parameters.GET_USER_POSTS
      order = order
    },
    SET_EDIT_POST: (state, post) => {
      state.editPost = post
    },
    PUSH_NOTIFICATION: (state, notification) => {
      state.notifications.push({
        ...notification, 
        id: (Math.random().toString(36) + Date.now().toString(36).substr(2))
      })
    },
    REMOVE_NOTIFICATION: (state, notificationToRemove) => {
      state.notifications = state.notifications.filter(notification => {
        return notification.id != notificationToRemove.id
      })
    }
    // SET_CURRENT_CATEGORY: (state, category) => {
    //   state.currentCategory = category
    // }
  },
  actions: {
    getPosts ({ state, commit }, category) {
      const postAddress = (category) ? '/api/categories/' + category.match(/\d+/)[0] + '/posts' : '/api/posts'
      axios.get(postAddress, {
          params: state.parameters,
          paramsSerializer: params => {
            return qs.stringify(params)
      }}).then(response => {
        commit('GET_POSTS', response.data['hydra:member'])
        if (response.data['hydra:totalItems']) {
          commit('SET_PAGINATION_LENGTH', Math.floor(response.data['hydra:totalItems'] / this.state.parameters.itemsPerPage)+1)
        } else {
          commit('SET_PAGINATION_LENGTH', 1)
        }
      })
    },
    getPostData ({ commit, state }, post_id) {
      axios.get('/api/posts/' + post_id.match(/\d+/)[0],).then(response => {
        commit('GET_POST_DATA', response.data)
      }).catch((error) => {
        // console.log(error)
        window.location = '/404'
      })
    },
    getUserData ({ commit, state }, user_id) {
      axios.get('/api/users/' + user_id.match(/\d+/)[0],).then(response => {
        commit('GET_USER_DATA', response.data)
      }).catch(() => {
        // window.location = '/404'
        this.dispatch('addNotification', {
          type: 'error',
          message: 'Błąd! Nie udało się pobrać danych użytkownika.',
        })
      })
    },
    getUserPosts ({ commit, state }, { user_id, page }) {
      axios.get('/api/users/' + user_id.match(/\d+/)[0] + '/posts', {
        params: {
          itemsPerPage: 5,
          order: 'desc',
          page: page
        },
      }).then(response => {
        commit('GET_USER_POSTS', response.data['hydra:member'])
        if (response.data['hydra:totalItems']) {
          commit('SET_PAGINATION_LENGTH_USER_POSTS', Math.floor(response.data['hydra:totalItems'] / 5)+1)
        } else {
          commit('SET_PAGINATION_LENGTH_USER_POSTS', 1)
        }
      }).catch(() => {
        this.dispatch('addNotification', {
          type: 'error',
          message: 'Błąd! Nie udało się pobrać ogłoszeń użytkownika.',
        })
      })
    },
    getUserReplies ({ commit, state }, { user_id, page }) {
      axios.get('/api/users/' + user_id.match(/\d+/)[0] + '/replies', {
        params: {
          itemsPerPage: 5,
          order: 'desc',
          page: page
        },
      }).then(response => {
        commit('GET_USER_REPLIES', response.data['hydra:member'])
        if (response.data['hydra:totalItems']) {
          commit('SET_PAGINATION_LENGTH_USER_REPLIES', Math.floor(response.data['hydra:totalItems'] / 5)+1)
        } else {
          commit('SET_PAGINATION_LENGTH_USER_REPLIES', 1)
        }
      }).catch(() => {
        this.dispatch('addNotification', {
          type: 'error',
          message: 'Błąd! Nie udało się pobrać odpowiedzi użytkownika.',
        })
      })
    },
    getCategories ({ commit, state }) {
      axios.get('/api/categories').then(response => {
        commit('GET_CATEGORIES', response.data['hydra:member'])
      })
    },
    registerUser ({ commit, state }, user) {
      axios.post('/api/users', user).then(response => {
        this.dispatch('loginUser', {
          email: user.email,
          password: user.password,
          newUser: true
        })
      }).catch(error => {
        this.dispatch('addNotification', {
          type: 'error',
          message: 'Błąd! Nie udało się zarejestrować nowego użytkownika.',
        })
      })
    },
    loginUser ({ commit, state }, user) {
      axios.post('/login', user).then(response => {
        state.loadingLogin = false
        const token = response.data.token
        const tokenData = jwt_decode(token)
        commit('SET_USER', { user: tokenData.id, admin: tokenData.roles.includes('ROLE_ADMIN') })
        localStorage.setItem('access_token', token)
        localStorage.setItem('current_user', tokenData.id)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        commit('SET_TOKEN', token)
        if (user.newUser) {
          this.dispatch('addNotification', {
            type: 'success',
            message: 'Zarejestrowano pomyślnie',
          })
          this.dispatch('toggleOverlay', false)
        } else {
          this.dispatch('addNotification', {
            type: 'success',
            message: 'Zalogowano pomyślnie',
          })
          this.dispatch('toggleOverlay', false)
          this.dispatch('openWelcomeSettings')
          // this.dispatch('createPost')
        }
      }).catch((error) => {
        this.dispatch('addNotification', {
          type: 'error',
          message: 'Błąd! Nie udało się zalogować.',
        })
      })
    },
    toggleOverlay ({ commit, state }, toggle) {
      commit('SET_FORM_LOGIN', toggle)
      commit('SET_FORM_REGISTER', toggle)
      commit('SET_SELECT_CATEGORY', toggle)
      commit('SET_ADD_FORM', toggle)
      commit('SET_CATEGORIES_BROWSER', toggle)
      commit('SET_WELCOME_SETTINGS', toggle)
    },
    openLoginForm ({ commit, state }) {
      commit('SET_FORM_LOGIN', true)
    },
    openRegisterForm ({ commit, state }) {
      commit('SET_FORM_REGISTER', true)
    },
    openSelectCategory ({ commit, state }) {
      commit('SET_SELECT_CATEGORY', true)
    },
    openAddForm ({ commit, state }) {
      commit('SET_ADD_FORM', true)
    },
    openEditForm({ commit, state }, post) {
      commit('SET_ADD_FORM', true)
      commit('SET_EDIT_POST', post)
    },
    emptyEditPost({ commit, state }) {
      commit('SET_EDIT_POST', null)
    },
    closeAddForm ({ commit, state }) {
      commit('SET_ADD_FORM', false)
    },
    openCategoriesBrowser ({ commit, state }) {
      commit('SET_CATEGORIES_BROWSER', true)
    },
    closeCategoriesBrowser ({ commit, state }) {
      commit('SET_CATEGORIES_BROWSER', false)
    },
    openWelcomeSettings ({ commit, state }) {
      commit('SET_WELCOME_SETTINGS', true)
    },
    closeWelcomeSettings ({ commit, state }) {
      commit('SET_WELCOME_SETTINGS', false)
    },
    setPage ({ commit, state }, page) {
      commit('SET_PAGE', page)
    },
    setItemsPerPage ({ commit, state }, number) {
      commit('SET_ITEMS_PER_PAGE', number)
    },
    setOrder ({ commit, state }, order) {
      commit('SET_ORDER', order)
    },
    setMinBudget ({ commit, state }, min) {
      commit('SET_MIN_BUDGET', min)
    },
    setMaxBudget ({ commit, state }, max) {
      commit('SET_MAX_BUDGET', max)
    },
    logout ({ state, commit }) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('current_user')
      commit('SET_TOKEN', null)
      commit('SET_USER', { user: null, admin: null })
    },
    deletePost ({ state, commit }, id) {
      axios.delete('/api/posts/' + id.match(/\d+/)[0]).then(response => {
        this.dispatch('addNotification', {
          type: 'success',
          message: 'Pomyślnie usunięto wpis',
        })
        router.push('/')
        commit('GET_POSTS', this.state.posts.filter(post => post['@id'] !== id))
      }).catch(() => {
        this.dispatch('addNotification', {
          type: 'error',
          message: 'Błąd! Nie udało się usunąć ogłoszenia',
        })
      })
    },
    deleteReply ({ state, commit }, reply) {
      axios.delete('/api/replies/' + reply.replyId.match(/\d+/)[0]).then(response => {
        this.dispatch('addNotification', {
          type: 'success',
          message: 'Pomyślnie usunięto wpis',
        })
        this.dispatch('getPostData', reply.postId)
      }).catch(() => {
        this.dispatch('addNotification', {
          type: 'error',
          message: 'Błąd! Nie udało się usunąć odpowiedzi.',
        })
      })
    },
    setNewPostCategory ({ commit, state }, category) {
      commit('SET_NEW_POST_CATEGORY', category)
      this.dispatch('createPost', state.newPost)
    },
    createPost ({ state, commit }, post) {
      if (!!post && !!state.newPost) {
        if (state.token && state.currentUser) {
          if (!state.newPostCategory) {
            commit('SET_NEW_POST', post)
            this.dispatch('openSelectCategory')
          } else {
            const newPost = state.newPost
            newPost.user = '/api/users/' + state.currentUser
            newPost.category = state.newPostCategory
            axios.post('/api/posts', newPost).then(response => {
              commit('SET_NEW_POST', {
                title: '',
                description: '',
                budget: '',
                category: '',
                user: '',
                days: ''
              })
              commit('SET_NEW_POST_CATEGORY', null)
              commit('SET_SELECT_CATEGORY', false)
              this.dispatch('addNotification', {
                type: 'info',
                message: 'Twoje ogłoszenie zostało dodane.',
                timeout: 5000
              })
              router.push({name: 'post', params: { post_id: response.data['@id'].match(/\d+/)[0] }})
            }).catch(error => {
              this.dispatch('addNotification', {
                type: 'error',
                message: 'Błąd! Nie udało się utworzyć ogłoszenia.',
              })
            })
          }
        } else {
          commit('SET_NEW_POST', post)
          this.dispatch('openLoginForm')
          this.dispatch('addNotification', {
            type: 'warning',
            message: 'Aby dodać ogłoszenie, musisz się zalogować.',
          })
        }
      }
    },
    editPost({ state, commit }, post) {
      if (state.token && state.currentUser) {
        axios.put('/api/posts/'+post.postId, post).then(response => {
          commit('SET_EDIT_POST', null)
          commit('SET_NEW_POST_CATEGORY', null)
          commit('SET_SELECT_CATEGORY', false)
          this.dispatch('getPostData', post.postId.toString())
          if (router.currentRoute.name == 'category' || router.currentRoute.name ==  'pagination_category') {
            this.dispatch('getPosts', router.currentRoute.params.category_id)
          } else {
            this.dispatch('getPosts', null)
          }
          this.dispatch('addNotification', {
            type: 'success',
            message: 'Twoje ogłoszenie zostało zmienione.',
            timeout: 5000
          })
        }).catch(error => {
          this.dispatch('addNotification', {
            type: 'error',
            message: 'Błąd! Nie udało się edytować ogłoszenia.',
          })
        })      
      }
    },
    editUserData({ state, commit }, userData) {
      if (state.token && state.currentUser) {
        axios.put('/api/users/'+userData.userId, userData).then(response => {
          this.dispatch('getUserData', userData.userId)
          this.dispatch('addNotification', {
            type: 'success',
            message: 'Profil użytkownika został zmieniony.',
            timeout: 5000
          })
        }).catch(error => {
          this.dispatch('addNotification', {
            type: 'error',
            message: 'Błąd! Nie udało się zmienić danych użytkownika.',
          })
        })
      }
    },
    sendReply ({ state, commit }, reply) {
      reply.isPublished = true
      reply.user = '/api/users/' + state.currentUser
      axios.post('/api/replies', reply).then(response => {
        this.dispatch('getPostData', reply.post)
        this.dispatch('addNotification', {
          type: 'success',
          message: 'Pomyślnie dodano nowy wpis',
        })
      }).catch(() => {
        this.dispatch('addNotification', {
          type: 'error',
          message: 'Błąd! Nie udało się wysłać odpowiedzi.',
        })
      })
    },
    editReply ({ state, commit }, reply) {
      reply.isPublished = true
      reply.user = '/api/users/' + state.currentUser.match(/\d+/)[0]
      axios.put('/api/replies/' + reply.replyId.match(/\d+/)[0], reply).then(response => {
        this.dispatch('getPostData', reply.post)
        this.dispatch('addNotification', {
          type: 'success',
          message: 'Twój wpis został pomyślnie edytowany'
        })
      }).catch(() => {
        this.dispatch('addNotification', {
          type: 'error',
          message: 'Błąd! Nie udało się edytować odpowiedzi!'
        })
      })
    },
    // getTags ({ commit, state }, tag) {
    //   axios.get('/api/tags/').then(response => {
    //     commit('GET_TAGS_DATA', response.data)
    //   })
    // },
    addNotification ({ state, commit }, notification ) {
      commit('PUSH_NOTIFICATION', notification)
    },
    removeNotification ({ state, commit }, notification) {
      commit('REMOVE_NOTIFICATION', notification)
    }
  },
})

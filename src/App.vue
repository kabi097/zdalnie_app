<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list
        dense
        nav
      >
        <v-list-item link @click="openAddForm">
          <v-list-item-content>
            <v-list-item-title>Dodaj ogłoszenie</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="openCategoriesBrowser">
          <v-list-item-content>
            <v-list-item-title>Przglądaj ogłoszenia</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loggedIn" link :to="{ name: 'profile', params: { user_id: $store.state.currentUser }}">
          <v-list-item-content>
            <v-list-item-title>Twój profil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loggedIn" link @click="$store.dispatch('logout')">
          <v-list-item-content>
            <v-list-item-title>Wyloguj</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!loggedIn" link @click="openLogin">
          <v-list-item-content>
            <v-list-item-title>Zaloguj się</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="!loggedIn" link @click="openRegister">
          <v-list-item-content>
            <v-list-item-title>Zarejestruj się</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon v-if="!this.$vuetify.breakpoint.smAndUp" @click="drawer = !drawer" />
      <v-spacer v-if="!this.$vuetify.breakpoint.smAndUp" />
      <v-toolbar-title>
        <v-btn class="text-none headline" color="primary" elevation="0" @click="navigateHome">
          <v-icon class="mx-1">mdi-mouse</v-icon><span class="font-weight-bold">zdalnie</span><span>.com.pl</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="this.$vuetify.breakpoint.smAndUp">
        <v-btn text @click="openAddForm">Dodaj ogłoszenie</v-btn>
        <v-btn text @click="openCategoriesBrowser">Przeglądaj ogłoszenia</v-btn>
        <v-btn v-if="loggedIn" text :to="{ name: 'profile', params: { user_id: $store.state.currentUser }}">Twój profil</v-btn>
        <v-btn v-if="loggedIn" text @click="$store.dispatch('logout')">Wyloguj</v-btn>
        <v-btn v-if="!loggedIn" text @click="openLogin">Zaloguj się</v-btn>
        <v-btn v-if="!loggedIn" text @click="openRegister">Zarejestruj się</v-btn>
        <v-btn text @click="test">Test</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
      <v-overlay :value="this.$store.state.showRegisterForm || this.$store.state.showLoginForm || this.$store.state.showSelectCategory || this.$store.state.showAddForm || this.$store.state.showCategoriesBrowser">
        <div class="d-sm-flex flex-sm-row-reverse">
          <v-btn
            icon
            :block="!this.$vuetify.breakpoint.smAndUp"
            @click="$store.dispatch('toggleOverlay', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <RegisterForm v-if="this.$store.state.showRegisterForm" />
          <LoginForm v-if="this.$store.state.showLoginForm" />
          <SelectCategory v-if="this.$store.state.showSelectCategory" />
          <AddForm popupMode v-if="this.$store.state.showAddForm" />
          <CategoriesBrowser popupMode v-if="this.$store.state.showCategoriesBrowser" />
        </div>
      </v-overlay>
    </v-content>
    <v-footer>
      Copyright 2019
    </v-footer>
    <notification-list />
  </v-app>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import SelectCategory from '@/components/SelectCategory.vue'
import AddForm from '@/components/AddForm.vue'
import CategoriesBrowser from '@/components/CategoriesBrowser.vue'
import NotificationList from '@/components/NotificationList.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    RegisterForm,
    LoginForm,
    SelectCategory,
    AddForm,
    CategoriesBrowser,
    NotificationList
  },
  data: () => ({
    showRegisterForm: true,
    drawer: null,
  }),
  computed: {
    loggedIn () { 
      return this.$store.getters.loggedIn
    },
    currentUser () {
      return this.$store.getters.currentUser
    },
  },
  mounted () {
    this.$store.dispatch('getCategories')
    if (this.$store.state.token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    } 
  },
  methods: {
    test () {
      // this.$swal.fire({
      //   title: 'Error!',
      //   text: 'Do you want to continue',
      //   icon: 'error',
      //   confirmButtonText: 'Cool'
      // })
      this.$store.dispatch('addNotification', {
          type: 'success',
          message: 'Fajne powiadomienie',
          timeout: 10000,
      })
    },
    navigateHome () {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      } else {
        location.reload()
      }
    },
    openLogin () {
      this.drawer = false
      this.$store.dispatch('toggleOverlay', false)
      this.$store.dispatch('openLoginForm')
    },
    openRegister () {
      this.drawer = false
      this.$store.dispatch('toggleOverlay', false)
      this.$store.dispatch('openRegisterForm')
    },
    openAddForm () {
      this.$store.dispatch('toggleOverlay', false)
      this.drawer = false
      if (this.$store.state.currentUser && this.$store.state.token) {
        this.$store.dispatch('openAddForm')
      } else {
      this.$store.dispatch('openLoginForm')
      }
    },
    openCategoriesBrowser () {
      this.drawer = false
      this.$store.dispatch('toggleOverlay', false)
      this.$store.dispatch('openCategoriesBrowser')
    }
  }
};
</script>
<style lang="css">
  .background-banner {
    background-image: url('../public/background.jpg');
    background-position: center center;
    background-size: cover;
  }

  .text-link-active {
    text-decoration: none;
    color: inherit !important;
  }

  .title-link-active {
    color: #01579B;
    text-decoration: none;
  }
 
  .title-link-active:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>

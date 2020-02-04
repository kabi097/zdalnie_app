<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list
        dense
        nav
      >
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Dodaj ogłoszenie</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Przglądaj ogłoszenia</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loggedIn" link>
          <v-list-item-content>
            <v-list-item-title>Twój profil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loggedIn" link @click="$store.dispatch('logout')">
          <v-list-item-content>
            <v-list-item-title>Wyloguj</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon v-if="!this.$vuetify.breakpoint.smAndUp" @click="drawer = !drawer" />
      <v-spacer v-if="!this.$vuetify.breakpoint.smAndUp" />
      <v-toolbar-title>
          <v-btn flat color="primary" class="text-none headline" elevation="0">
          <v-icon class="mx-1">mdi-mouse</v-icon><span class="font-weight-bold">zdalnie</span><span>.com.pl</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="this.$vuetify.breakpoint.smAndUp">
        <v-btn text>Dodaj ogłoszenie</v-btn>
        <v-btn text>Przeglądaj ogłoszenia</v-btn>
        <v-btn v-if="loggedIn" text>Twój profil</v-btn>
        <v-btn v-if="loggedIn" text @click="$store.dispatch('logout')">Wyloguj</v-btn>
        <v-btn v-if="!loggedIn" text @click="$store.dispatch('openLoginForm')">Zaloguj się</v-btn>
        <v-btn v-if="!loggedIn" text @click="$store.dispatch('openRegisterForm')">Zarejestruj się</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
      <v-overlay :value="this.$store.state.showRegisterForm || this.$store.state.showLoginForm">
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
        </div>
      </v-overlay>
      <v-snackbar
        v-model="snackbarShow"
        :color="snackbarColor"
        loading="10000"
      >
        {{ $store.state.snackbarText }}
        <v-btn
          color="pink"
          text
          light
          @click="$store.dispatch('setSnackbar', '')"
        >
          Zamknij
        </v-btn>
      </v-snackbar>
    </v-content>
    <v-footer>
      Copyright 2019
    </v-footer>
  </v-app>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'App',
  components: {
    RegisterForm,
    LoginForm
  },
  data: () => ({
    showRegisterForm: true,
    snackbarShow: false,
    drawer: null,
    snackbarColor: 'error'
  }),
  computed: {
    loggedIn () { 
      return this.$store.getters.loggedIn
    }
  },
  created: function () {
    this.$store.subscribe((mutation, state) => {
      if (state.snackbarText !== '') {
        this.snackbarShow = true
        this.snackbarColor = this.$store.state.snackbarColor
        // this.$store.dispatch('setSnackbar', '')
      } else {
        this.snackbarShow = false
      }
    })
  }
};
</script>
<style lang="css">
  .background-banner {
    background-image: url('https://get.pxhere.com/photo/coffee-colleagues-device-group-hot-drink-indoors-internet-laptop-male-modern-network-office-people-remote-work-room-screen-sitting-smartphone-table-technology-typing-wear-wireless-wooden-workers-working-workplace-workspace-1523267.jpg');
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

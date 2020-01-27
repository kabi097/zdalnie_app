<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <v-btn flat color="primary" class="text-none headline">
          <v-icon class="mx-1">mdi-mouse</v-icon><span class="font-weight-bold">zdalnie</span><span>.com.pl</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text>Dodaj ogłoszenie</v-btn>
        <v-btn text>Przeglądaj ogłoszenia</v-btn>
        <v-btn text>Twój profil</v-btn>
        <v-btn text>Wyloguj</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
      <v-overlay :value="showRegisterForm">
        <div class="d-sm-flex flex-sm-row-reverse">
          <v-btn
            icon
            :block="this.$vuetify.breakpoint.smAndUp ? false : true"
            @click="showRegisterForm = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <RegisterForm />
        </div>
      </v-overlay>
    </v-content>
    <v-footer>
      Copyright 2019
    </v-footer>
  </v-app>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'App',
  components: {
    RegisterForm,
  },
  data: () => ({
    showRegisterForm: true,
  }),
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

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <v-btn flat color="primary" class="text-none headline">
          <v-icon class="mx-1">mdi-mouse</v-icon><span class="font-weight-bold">zdalnie</span>.com.pl
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
    </v-content>
    <v-footer>
      Copyright 2019
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
<style lang="css">
  .background-banner {
    background-image: url('https://get.pxhere.com/photo/coffee-colleagues-device-group-hot-drink-indoors-internet-laptop-male-modern-network-office-people-remote-work-room-screen-sitting-smartphone-table-technology-typing-wear-wireless-wooden-workers-working-workplace-workspace-1523267.jpg');
    background-position: center center;
    background-size: cover;
  }
</style>

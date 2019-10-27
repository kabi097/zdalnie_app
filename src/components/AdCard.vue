<template>
  <v-card>
    <v-row align="stretch" class="card-color mb-3 mx-0 px-0">
      <v-col cols="12" xs="12" md="7" class="pr-4">
        <div class="title"><v-icon class="pr-2">mdi-xbox-controller</v-icon>Zlecę przebudowę strony internetowej</div>
        <div class="overline text-none my-1">NOWOŚĆ - od 3 dni</div>
        <div class="body-2 my-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam ipsam
          eligendi libero praesentium veniam deleniti id, quidem, quaerat nulla ex tenetur quisquam
          delectus </div>
          <v-chip-group column>
            <v-chip small class="mr-1">HTML</v-chip>
            <v-chip small class="mr-1">CSS</v-chip>
            <v-chip small class="mr-1">PHP</v-chip>
            <v-chip small class="mr-1">Laravel</v-chip>
            <v-chip small class="mr-1">REST API</v-chip>
          </v-chip-group>
      </v-col>
      <v-col cols="12" md="5">
        <v-row class="fill-height" no-gutters align="center" align-content="space-between" justify="space-between">
          <v-col xs="10" md="12">
            <v-row no-gutters>
              <v-col xs="6" sm="4" md="4" class="px-md-3">
                <div class="grey--text">Budżet</div>
                <div>600 zł</div>
              </v-col>
              <v-col xs="6" sm="4" md="4" class="px-md-3">
                <div class="grey--text">Liczba ofert</div>
                <div>14</div>
              </v-col>
              <v-col xs="6" sm="4" md="4">
                <div class="grey--text">Pozostało</div>
                <div>6 dni</div>
              </v-col>
            </v-row>
          </v-col>
          <v-col xs="2" class="col-auto ml-auto">
            <Menu :items="items"></Menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import Menu from '@/components/Menu.vue';

export default {
    components: {
      Menu
    },
    data() {
      return {
        items: [
          { title: 'Kopiuj link', icon: 'mdi-link' },
          { title: 'Edytuj', icon: 'mdi-pencil' },
          { title: 'Usuń', icon: 'mdi-trash-can-outline' },
          { title: 'Zgłoś', icon: 'mdi-alert-circle-outline' },
        ],
      }
    }
}
</script>
<style lang="css">
  .card-color {
      border-left: 3px solid red;
  }

</style>
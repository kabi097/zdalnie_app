<template>
  <v-card>
    <v-layout wrap class="pa-3 card-color mb-3">
      <v-flex xs12 md7 class="pr-4">
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
      </v-flex>
      <v-flex md5>
        <v-layout wrap fill-height align-content-space-between justify-space-between>
          <v-flex xs10 md12>
            <v-layout>
              <v-flex xs6 sm4 md4 class="px-md-3">
                <div class="grey--text">Budżet</div>
                <div>600 zł</div>
              </v-flex>
              <v-flex xs6 sm4 md4 class="px-md-3">
                <div class="grey--text">Liczba ofert</div>
                <div>14</div>
              </v-flex>
              <v-flex xs6 sm4 md4>
                <div class="grey--text">Pozostało</div>
                <div>6 dni</div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs2 class="ml-auto">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn rounded v-on="on" light icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  @click=""
                >
                  <v-list-item-title><v-icon class="mr-3" v-text="item.icon"></v-icon>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
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

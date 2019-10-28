<template>
    <v-container>
        <v-row min-width="600px" no-gutters align="center">
          <v-col md="6" class="my-sm-10">
            <div class="display-3 text-sm-center font-weight-bold text-md-left white--text shadow-text1">
              Pracuj zdalnie! Znajdź zlecenie dla siebie!
            </div>
            <div class="subtitle-1 pa-6 text-sm-center text-md-left font-weight-bold text-uppercase shadow-text1 white--text">lub</div>
            <div class="text-sm-center text-md-left">
              <v-btn color="primary" @click="$emit('show-form')">Dodaj ogłoszenie</v-btn>
            </div>
          </v-col>
          <v-col md="6">
              <v-row no-gutters>
                  <v-col xs="6" md="4" class="pa-2" v-for="category in categories" :key="category.id">
                        <v-btn large block class="left elevation10">
                            <v-icon left>{{ category.icon }}</v-icon>
                            <span class="text-none">{{ category.name }}</span>
                        </v-btn>
                  </v-col>
              </v-row>
          </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        categories: [
            { id: 1, name: "Programowanie", icon: 'mdi-xbox-controller'},
            { id: 2, name: "Fotografia", icon: 'mdi-xbox-controller'},
            { id: 3, name: "Grafika", icon: 'mdi-xbox-controller'},
            { id: 4, name: "Korepetycje", icon: 'mdi-xbox-controller'},
            { id: 5, name: "Prawo", icon: 'mdi-xbox-controller'},
            { id: 6, name: "Firma", icon: 'mdi-xbox-controller'},
            { id: 7, name: "Video", icon: 'mdi-xbox-controller'},
            { id: 8, name: "Strony internetowe", icon: 'mdi-xbox-controller'},
            { id: 9, name: "Programowanie", icon: 'mdi-xbox-controller'},
            { id: 10, name: "Programowanie", icon: 'mdi-xbox-controller'},
            { id: 11, name: "Programowanie", icon: 'mdi-xbox-controller'},
            { id: 12, name: "Programowanie", icon: 'mdi-xbox-controller'},


        ]
    })
}
</script>
<style lang="css">
    .category_box {
        border: 3px solid red;
    }
</style>
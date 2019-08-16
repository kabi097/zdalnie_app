<template>
      <v-container fill-height>
        <v-layout wrap align-center>
          <v-flex md6 class="my-sm-10">
            <div class="display-3 text-sm-center text-md-left white--text font-weight-bold shadow-text1">
              Szukasz wykonawcy? Dodaj swoje ogłoszenie!
            </div>
            <div class="subtitle-1 pa-6 text-sm-center text-md-left font-weight-bold text-uppercase shadow-text1 white--text">lub</div>
            <div class="text-sm-center text-md-left">
              <v-btn @click="$emit('browse_categories', 1)" color="primary" elevation="24">Przeglądaj zlecenia</v-btn>
            </div>
          </v-flex>
          <v-flex md6>
            <v-card elevation="24" class="my-6">
              <v-card-title class="mb-3">Dodaj ogłoszenie</v-card-title>
              <v-form class="mx-4">
                <v-text-field outlined label="Tytuł"
                  placeholder="Zlecę przebudowę strony internetowej"></v-text-field>
                <v-textarea outlined label="Opis" placeholder="Tutaj wpisz opis"></v-textarea>
                <v-layout>
                    <v-flex md6 pr-1>                        
                        <v-text-field outlined label="Budżet zlecenia" placeholder="500"></v-text-field>
                    </v-flex>
                    <v-flex md6 pl-1>
                        <v-select outlined label="Okres ważności" :items="days_numbers"></v-select>
                    </v-flex>
                </v-layout>              
              </v-form>
              <v-card-actions>
                <v-btn block color="primary" class="mb-4">Wyślij</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>
<script>
import { Stream } from 'stream';
export default {
    data() {
        return {
            days_numbers: ['3 dni','7 dni','14 dni','30 dni','45 dni'],
            //payment_types: ['za całość', 'za roboczogodzinę', 'za sztukę'],
            categories: [""]
        }
    }
}
</script>
<style lang="css">
  .shadow-text1 {
    text-shadow: 2px 2px 2px black; 
  }
</style>
<template>
  <v-container>
      <v-layout>
          <v-flex md3> 
            <v-card class="mr-4">
              <v-list-item-avatar>
                
              </v-list-item-avatar>
            </v-card>
          </v-flex>
          <v-flex md9>
            <v-card>
              <v-toolbar flat dense>
                <v-toolbar-items>
                  <v-btn text><v-icon left>mdi-arrow-left</v-icon>Poprzedni</v-btn>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn text>Następny<v-icon right>mdi-arrow-right</v-icon></v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-divider></v-divider>
              <div class="pa-4 mb-3">
                  <div class="headline pb-2 font-weight-medium">
                    <v-icon class="pr-3">mdi-xbox-controller</v-icon>
                    Zlecę przebudowę strony internetowej
                  </div>
                  <ul style="list-style: none; padding: 0">
                  <li><v-icon class="pr-4">mdi-cash</v-icon>
                  Budżet: 400 zł</li>

                  <li><v-icon class="pr-4">mdi-calendar-range</v-icon>
                  Pozostało: 4 dni</li>

                  <li><v-icon class="pr-4">mdi-account-group</v-icon>
                  Liczba zgłoszeń: 14</li>
                  </ul>
                  
                  <div class="body-2 py-3 font-weight-medium">Opis</div>
                  <div class="font-weight-regular">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis consequuntur sint, error dolor id saepe. Nisi itaque modi aliquam nesciunt sed, ipsam hic voluptas, quibusdam soluta cupiditate commodi natus? 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illo voluptates saepe, est laudantium autem nisi molestias magni facere, explicabo libero cumque officiis minima quas nostrum inventore velit a eius!
                    lorem
                  </div>
              </div>
            </v-card>
            <replies-list></replies-list>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import RepliesList from '@/components/RepliesList.vue';

export default {
  components: {
    RepliesList
  }
}
</script>

<style>

</style>
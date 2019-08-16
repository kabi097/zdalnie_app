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
              <v-list dense>
                <v-list-item>
                  <v-icon class="pr-4">mdi-xbox-controller</v-icon>
                  <div class="title">Zlecę przebudowę strony internetowej</div>
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-4">mdi-cash</v-icon>
                  Budżet: 400 zł
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-4">mdi-calendar-range</v-icon>
                  Pozostało: 4 dni
                </v-list-item>
                <v-list-item>
                  <v-icon class="pr-4">mdi-account-group</v-icon>
                  Liczba zgłoszeń: 14
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>Opis</v-list-item-subtitle>
                    
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <p class="mx-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium eius libero ab, assumenda atque unde illo ipsa odit, rem ducimus ut repudiandae minima, quo ad repellendus eum fugiat doloribus voluptatem?</p>
              

            </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
<template>
    <v-container>
        <v-stepper v-model="e1">
            <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Dodaj treść</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Informacje dodatkowe</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Podsumowanie</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
            <v-stepper-content step="1">
                <v-text-field label="Tytuł" placeholder="Zlecę przebudowę strony internetowej"></v-text-field>
                <v-textarea label="Opis" placeholder="Tutaj wpisz opis"></v-textarea>

                <v-btn color="primary" @click="e1 = 2">
                Continue
                </v-btn>

                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                <v-btn color="primary" @click="e1 = 3">
                Continue
                </v-btn>

                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                <v-btn color="primary" @click="e1 = 1">
                Continue
                </v-btn>

                <v-btn text>Cancel</v-btn>
            </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>
<script>
  export default {
    data: () => ({
      el: 1
    }),
  }
</script>
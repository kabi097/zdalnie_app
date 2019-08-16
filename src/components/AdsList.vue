<template>
    <div>
        <v-container class="mt-3">
            <div class="headline mb-5">Przeglądaj zlecenia</div>
            <v-layout wrap>
                <v-flex md3 class="pr-3 mb-3">
                    <v-card>
                        <v-card-title>
                            Filtrowanie
                        </v-card-title>
                        <v-card-text>
                            <div class="subtitle-2 mt-4">Kategoria</div> 
                            <v-treeview :items="items"></v-treeview>
                            <v-form ref="filter_form" lazy-validation>
                              <div class="subtitle-2 mt-4">Budżet</div> 
                              <v-layout>
                                  <v-flex xs6 class="my-1">
                                      <v-text-field :rules="min_rules" v-bind="min_value" placeholder="Od"></v-text-field>
                                  </v-flex>
                                  <v-flex xs6 class="my-1">
                                      <v-text-field :rules="max_rules" v-bind="max_value" placeholder="Do"></v-text-field>
                                  </v-flex>
                              </v-layout>
                              
                              <div class="subtitle-2 mt-4">Umiejętności</div> 
                              <v-combobox
                              v-model="select"
                              :items="skills"
                              multiple
                              dense
                              light
                              small-chips deletable-chips
                              label="Wybierz umiejętności"
                              ></v-combobox>

                              <div class="subtitle-2 mt-4">Sortowanie</div> 
                              <v-select :items="['Tytuł', 'Najnowsze', 'Do końca']"></v-select>

                              <div class="subtitle-2 mt-4">Pokaż na stronie</div> 
                              <v-select :items="[10, 30, 50]"></v-select>
                              <v-btn text class="float-right mt-6">Filtruj</v-btn>
                              <div class="clear"></div>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex md9>
                    <div class="body-1 mb-4 px-2">Wszystkie zlecenia</div>
                    <ad-card></ad-card>
                    <ad-card></ad-card>
                    <ad-card></ad-card>
                    <ad-card></ad-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import AdCard from '@/components/AdCard.vue';

export default {
    components: {
        AdCard,
    },
    data: () => ({
      max_value: "",
      min_value: "",
      min_rules: [
        v => (((parseInt(v) == v && v<parseInt(max_value)) || max_value=="") || 'error'),
      ],
      max_rules: [
        v => (parseInt(v) == v && (v>min_value || min_value==""))
      ],
      skills: [
          "HTML",
          "CSS",
          "PHP",
          "Laravel",
          "REST API"
      ],
      items: [
        {
          id: 1,
          name: 'Programowanie',
          children: [
            { id: 2, name: 'Strony i aplikacje webowe' },
            { id: 3, name: 'Sieci komputerowe' },
            { id: 4, name: 'Programy specjalistyczne' },
            { id: 6, name: 'Pozostałe' },
          ],
        },
        {
          id: 7,
          name: 'Grafika i multimedia',
          children: [
            { id: 2, name: 'Grafika komputerowa' },
            { id: 3, name: 'Animacja' },
            { id: 4, name: 'Fotografia' },
            { id: 6, name: 'Muzyka' },
            { id: 6, name: 'Pozostałe' },
          ],
        },
        {
          id: 17,
          name: 'Korepetycje',
          children: [
            { id: 18, name: 'Redagowanie tekstów' },
            { id: 19, name: 'Tłumaczenia' },
            { id: 20, name: 'Pozostałe' },
          ],
        },
        {
          id: 21,
          name: 'Prawo',
          children: [
            { id: 18, name: 'Księgowość' },
            { id: 19, name: 'Podatki' },
            { id: 20, name: 'Obsługa firmy' },
          ],
        },
      ],
    }),
}
</script>
<style>
    .card-color {
        border-left: 3px solid red;
    }

    .clear { 
      clear: both;
    }
</style>

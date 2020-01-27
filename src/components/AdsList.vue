<template>
    <div>
        <v-container class="mt-3">
            <div class="headline mb-5">Przeglądaj zlecenia</div>
            <v-row>
                <v-col cols="12" md="3" class="pr-3 mb-3">
                    <v-card>
                        <v-card-title>
                            Filtrowanie
                        </v-card-title>
                        <v-card-text>
                            <div class="subtitle-2 mt-4">Kategoria</div> 
                            <v-treeview :items="items" />
                            <v-form ref="filter_form" lazy-validation>
                              <div class="subtitle-2 mt-4">Budżet</div> 
                              <v-row>
                                  <v-col xs6 class="my-1">
                                      <v-text-field :rules="min_rules" v-bind="min_value" placeholder="Od" />
                                  </v-col>
                                  <v-col xs6 class="my-1">
                                      <v-text-field :rules="max_rules" v-bind="max_value" placeholder="Do" />
                                  </v-col>
                              </v-row>
                              
                              <div class="subtitle-2 mt-4">Umiejętności</div> 
                              <v-combobox
                              v-model="select"
                              :items="skills"
                              multiple
                              dense
                              light
                              small-chips deletable-chips
                              label="Wybierz umiejętności"
                              />

                              <div class="subtitle-2 mt-4">Sortowanie</div> 
                              <v-select :items="['Tytuł', 'Najnowsze', 'Do końca']" />

                              <div class="subtitle-2 mt-4">Pokaż na stronie</div> 
                              <v-select :items="[10, 30, 50]" />
                              <v-btn text class="float-right mt-6">Filtruj</v-btn>
                              <div class="clear" />
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="9">
                    <div class="body-1 mb-4 px-2">Wszystkie zlecenia</div>
                    <ad-card title="Zlecę stworzenie strony internetowej" link="/example" />
                    <ad-card title="Zlecę stworzenie strony internetowej" link="/example" />
                    <ad-card title="Zlecę stworzenie strony internetowej" link="/example" />
                    <ad-card title="Zlecę stworzenie strony internetowej" link="/example" />
                </v-col>
            </v-row>
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
    .clear { 
      clear: both;
    }
</style>

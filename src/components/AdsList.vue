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
                            <v-treeview hoverable activatable :items="categories" />
                            <v-form ref="filter_form" lazy-validation>
                              <div class="subtitle-2 mt-4">Budżet</div> 
                              <v-row>
                                  <v-col xs6 class="my-1">
                                      <v-text-field v-model="min_value" placeholder="Od" />
                                  </v-col>
                                  <v-col xs6 class="my-1">
                                      <v-text-field v-model="max_value" placeholder="Do" />
                                  </v-col>
                              </v-row>
                              
                              <div class="subtitle-2 mt-4">Umiejętności</div> 
                              <v-combobox
                              v-model="select"
                              :items="['PHP', 'HTML', 'CSS', 'JAVASCRIPT']"
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
                    <ad-card v-for="post in posts" :key="post['@id']" :post="post" link="/example" />
                    <div v-if="posts.length==0" class="d-block title py-5 text-center grey lighten-2">Brak wpisów do wyswietlenia</div>
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
    computed: {
      posts () {
        return this.$store.getters.allPosts
      },
      categories () {
        return this.$store.getters.allCategories
      }
    },
    watch: {
      $route: function (to, from) {
        if (to.name=='category') {
          this.$store.dispatch('getPosts', to.path)
        } else {
          this.$store.dispatch('getPosts')
        }
      }
    },
    mounted () {
      this.$store.dispatch('getPosts')
    },
    data: () => ({
      max_value: '',
      min_value: '',
      select: [],
    }),
}
</script>
<style>
    .clear { 
      clear: both;
    }
</style>

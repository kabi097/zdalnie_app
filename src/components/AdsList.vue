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
                            <v-form ref="filterForm" v-model="valid" lazy-validation>
                              <div class="subtitle-2 mt-4">Budżet</div> 
                              <v-row>
                                  <v-col xs6 class="my-1">
                                      <v-text-field v-model="min_value" :rules="numberRules" placeholder="Od" />
                                  </v-col>
                                  <v-col xs6 class="my-1">
                                      <v-text-field v-model="max_value" :rules="numberRules" placeholder="Do" />
                                  </v-col>
                              </v-row>
                              
                              <!-- <div class="subtitle-2 mt-4">Umiejętności</div> 
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
                              <v-select :items="['Tytuł', 'Najnowsze', 'Do końca']" /> -->

                              <div class="subtitle-2 mt-4">Pokaż na stronie</div> 
                              <v-select :items="[5, 10, 30]" v-model="itemsPerPage" />
                              <v-btn text class="float-right mt-6" @click="validate">Filtruj</v-btn>
                              <div class="clear" />
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="9">
                    <div class="body-1 mb-4 px-2">Wszystkie zlecenia</div>
                    <ad-card v-for="post in posts" :key="post['@id']" :post="post" :link="'/post/'+post['@id'].match(/\d+/)[0]" />
                    <div v-if="posts.length==0" class="d-block title py-5 text-center grey lighten-2">Brak wpisów do wyswietlenia</div>
                    <div class="text-center">
                      <v-pagination
                        v-model="page"
                        :length="length"
                      ></v-pagination>
                    </div>
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
    methods: {
      validate () {
        if (this.$refs.filterForm.validate()) {
          this.page = 1
          this.$store.dispatch('setPage', 1)
          this.$store.dispatch('setItemsPerPage', this.itemsPerPage)
          if (this.$route.name == 'category' || this.$route.name == 'pagination_category') {
            this.$store.dispatch('getPosts', this.$route.path)
            this.$router.push({ name: 'category', params: { category_id: this.$route.params.category_id } })
          } else {
            this.$router.push({ name: 'home' })
            this.$store.dispatch('getPosts')
          }
        }
      }
    },
    computed: {
      posts () {
        return this.$store.getters.allPosts
      },
      categories () {
        return this.$store.getters.allCategories
      },
      length () {
        return this.$store.getters.paginationLength
      }
    },
    watch: {
      $route: function (to, from) {
        if (to.name == 'category') {
          this.$store.dispatch('getPosts', to.path)
        } else {
          this.$store.dispatch('getPosts')
        }
      },
      page (pageNumber) {
        this.$store.dispatch('setPage', pageNumber)
        if (this.$route.name == 'category' || this.$route.name == 'pagination_category') {
          this.$router.push({ name: 'pagination_category', params: { category_id: this.$route.params.category_id, page: pageNumber } })
        } else {
          this.$router.push({ name: 'pagination_home', params: { page: pageNumber } })
        }
      }
    },
    mounted () {
      if (this.$route.name == 'pagination_home' || this.$route.name == 'pagination_category') {
        this.$store.dispatch('setPage', this.$route.params.page)
        this.page = parseInt(this.$route.params.page, 10)
      }
      if (this.$route.name == 'category' || this.$route.name == 'pagination_category') {
        this.$store.dispatch('getPosts', this.$route.path)
      } else {
        this.$store.dispatch('getPosts')
      }
    },
    data: () => ({
      page: 1,
      itemsPerPage: 10,
      max_value: '',
      min_value: '',
      valid: true,
      select: [],
      numberRules: [
        v => (v == '' || (parseInt(v, 10))) || 'Pole może zawierać wyłącznie cyfry'
      ],
    }),
}
</script>
<style>
    .clear { 
      clear: both;
    }
</style>

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
                            <!-- <v-treeview hoverable activatable :items="categories" /> -->
                            <v-list dense>
                              <v-list-item-group v-model="activeCategory" color="primary">
                                <v-list-item v-for="category in categories" :key="category['@id']" :value="category['@id'].match(/\d+/)[0]" color="success" @click="selectedCategory(category['@id'])">
                                  <v-list-item-icon>
                                    <v-icon v-text="category.icon" />
                                  </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title v-text="category.name" />
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
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
                              -->
                              <div class="subtitle-2 mt-4">Sortowanie</div> 
                              <v-select v-model="order" :items="orderOptions" /> 

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
    data: () => ({
      page: 1,
      itemsPerPage: 10,
      max_value: '',
      min_value: '',
      valid: true,
      select: [],
      order: null,
      activeCategory: null,
      orderOptions: [
        {
          text: 'Najnowsze',
          value: {
            createdAt: 'desc'
          }
        },
        { 
          text: 'Najstarsze',
          value: {
            createdAt: 'asc'
          }
        },
        {
          text: 'Kończące się',
          value: {
            endDate: 'asc'
          }
        }
      ],
      numberRules: [
        v => (v == '' || (parseInt(v, 10))) || 'Pole może zawierać wyłącznie cyfry'
      ]
    }),
    computed: {
      posts () {
        return this.$store.getters.allPosts
      },
      categories () {
        return this.$store.getters.allCategories
      },
      length () {
        return this.$store.getters.paginationLength
      },
      queryParams () {
        return this.$store.getters.queryParams
      }
    },
    watch: {
      $route: function (to, from) {
        if (to.name == 'category') {
          this.$store.dispatch('getPosts', to.path)
        } else {
          this.$store.dispatch('getPosts')
        }
        if (to.name == 'category' || to.name == 'pagination_category') {
          this.activeCategory = to.params.category_id
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
      this.order = this.queryParams.order
      if (this.$route.name == 'pagination_home' || this.$route.name == 'pagination_category') {
        this.$store.dispatch('setPage', this.$route.params.page)
        this.page = parseInt(this.$route.params.page, 10)
      }
      if (this.$route.name == 'category' || this.$route.name == 'pagination_category') {
        this.activeCategory = this.$route.params.category_id
        this.$store.dispatch('getPosts', this.$route.path)
      } else {
        this.$store.dispatch('getPosts')
      }
    },
    methods: {
      validate () {
        if (this.$refs.filterForm.validate()) {
          if (this.queryParams.itemsPerPage !== this.itemsPerPage) {
            this.page = 1
            this.$store.dispatch('setPage', 1)
          }
          this.$store.dispatch('setOrder', this.order)
          this.$store.dispatch('setItemsPerPage', this.itemsPerPage)
          this.$store.dispatch('setMinBudget', this.min_value)
          this.$store.dispatch('setMaxBudget', this.max_value)
          if (this.$route.name == 'category' || this.$route.name == 'pagination_category') {
            this.$store.dispatch('getPosts', this.$route.path)
            this.$router.push({ 
              name: 'category', 
              params: { category_id: this.$route.params.category_id },
              query: {
                itemsPerPage: this.itemsPerPage,
                min: this.min_value,
                max: this.max_value,
                ...this.order
              }
            })
          } else {
            this.$router.push({ name: 'home' })
            this.$store.dispatch('getPosts')
          }
        }
      },
      selectedCategory (categoryId) {
        if (this.$route.params.category_id == categoryId.match(/\d+/)[0]) {
          this.$router.push('/')
        } else {
          this.$router.push('/category/' + categoryId.match(/\d+/)[0])
        }
        if (this.popupMode) {
          this.$store.dispatch('toggleOverlay', false)
        }
      }
    },
}
</script>
<style>
    .clear { 
      clear: both;
    }
</style>

<template>
    <v-container>
        <v-row justify="center" min-width="600px" class="my-12" no-gutters align="center">
          <v-col v-if="!popupMode" cols="12" md="6" class="my-sm-10">
            <div class="display-3 text-center font-weight-bold text-md-left white--text shadow-text1">
              Pracuj zdalnie! Znajdź zlecenie dla siebie!
            </div>
            <div class="subtitle-1 pa-6 text-center text-md-left font-weight-bold text-uppercase shadow-text1 white--text">
              lub
            </div>
            <div class="text-center mb-8 text-md-left">
              <v-btn color="primary" @click="$emit('show-form')">
                Dodaj ogłoszenie
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6">
              <v-row no-gutters>
                  <v-col v-for="category in categories" :key="category['@id']" xs="6" md="4" class="pa-2">
                        <v-btn light :color="($route.params.category_id == category['@id'].match(/\d+/)[0]) ? 'success' : undefined" class="py-6 left elevation10" large block @click="selectedCategory(category['@id'])">
                            <v-icon left>
                              {{ category.icon }}
                            </v-icon>
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
  props: {
    popupMode: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    categories () {
      return this.$store.getters.allCategories
    }
  },
  methods: {
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
  mounted () {
    if (this.$route.params.category_id) {
      this.$store.dispatch('getPosts', this.$route.params.category_id)
      if (!this.popupMode) {
        this.$store.dispatch('toggleOverlay', false)
      }
    }
  }
}
</script>
<style lang="css">
    .category_box {
        border: 3px solid red;
    }
</style>

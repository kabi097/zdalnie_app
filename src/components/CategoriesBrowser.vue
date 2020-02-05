<template>
    <v-container>
        <v-row min-width="600px" class="my-12" no-gutters align="center">
          <v-col md="6" class="my-sm-10">
            <div class="display-3 text-sm-center font-weight-bold text-md-left white--text shadow-text1">
              Pracuj zdalnie! Znajdź zlecenie dla siebie!
            </div>
            <div class="subtitle-1 pa-6 text-sm-center text-md-left font-weight-bold text-uppercase shadow-text1 white--text">lub</div>
            <div class="text-sm-center text-md-left">
              <v-btn color="primary" @click="$emit('show-form')">Dodaj ogłoszenie</v-btn>
            </div>
          </v-col>
          <v-col md="6">
              <v-row no-gutters>
                  <v-col v-for="category in categories" :key="category['@id']" xs="6" md="4" class="pa-2">
                        <v-btn :color="($route.params.category_id == category['@id'].match(/\d+/)) ? 'success' : undefined" @click="$router.push('/category/'+category['@id'].match(/\d+/))" large block class="left elevation10">
                            <v-icon left>{{ category.icon }}</v-icon>
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
    computed: {
      categories () {
        return this.$store.getters.allCategories
      }
    },
    mounted () {
      (this.$route.params.category_id) ? this.$store.dispatch('getPosts', this.$route.params.category_id) : ''
    }
}
</script>
<style lang="css">
    .category_box {
        border: 3px solid red;
    }
</style>
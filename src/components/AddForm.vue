<template>
    <v-container fill-height>
      <v-row no-gutters align="center" justify="center">
        <v-col v-if="!popupMode" cols="auto" md="6" class="my-sm-10">
          <div class="display-3 text-center text-md-left white--text font-weight-bold shadow-text1">
            Szukasz wykonawcy? Dodaj swoje ogłoszenie!
          </div>
          <div class="subtitle-1 pa-6 text-center text-md-left font-weight-bold text-uppercase shadow-text1 white--text">lub</div>
          <div class="text-center text-md-left">
            <v-btn @click="$emit('browse_categories', 1)" color="primary" elevation="24">Przeglądaj zlecenia</v-btn>
          </div>
        </v-col>
        <v-col :cols="popupMode ? 12 : 'auto'" :md="popupMode ? 12 : 6">
          <v-card light elevation="24" class="my-6">
            <v-card-title class="mb-3">{{ post ? 'Edytuj ogłoszenie' : 'Dodaj ogłoszenie' }}</v-card-title>
            <v-form ref="addForm" v-model="valid" class="mx-4">
              <v-text-field v-model="title" outlined label="Tytuł"
                placeholder="Zlecę przebudowę strony internetowej" :rules="textRules" required />
              <v-textarea v-model="description" outlined label="Opis" placeholder="Tutaj wpisz opis" :rules="textRules" required />
              <v-row>
                  <v-col md="6" class="pr-1">                        
                      <v-text-field v-model="budget" outlined label="Budżet zlecenia" placeholder="500" :rules="numberRules" required />
                  </v-col>
                  <v-col md="6" class="pl-1">
                      <v-select v-if="!post" v-model="days" outlined label="Okres ważności" :items="days_numbers" :disabled="!!post" :required="!post" />
                      <v-select v-else v-model="category" outlined label="Kategoria" :items="categories" required />
                  </v-col>
              </v-row>              
            </v-form>
            <v-card-actions>
              <v-btn color="primary" @click="submitForm" block class="mb-4">Wyślij</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import { Stream } from 'stream';
import { mapState, mapGetters } from 'vuex';
export default {
  props: {
    popupMode: {
      type: Boolean,
      default: false,
      required: false
    },
    post: {
      type: Object,
      required: false
    }
  },
  data () {
      return {
        valid: true,
        days_numbers: ['3 dni','7 dni','14 dni','30 dni','45 dni'],
        category: (this.post) ? this.post.category['@id'] : '',
        title: (this.post) ? this.post.title : '',
        description: (this.post) ? this.post.description : '',
        budget: (this.post) ? this.post.budget.toString() : '0',
        days: (this.post) ? this.post.leftDays : '14 dni',
        textRules: [
          v => !!v || 'Pole jest wymagane',
          v => (v && v.length >= 5) || 'Pole musi mieć co najmniej 5 znaków'
        ],
        numberRules: [
          v => !!v || 'Pole jest wymagane',
          v => (parseInt(v, 10)) || 'Pole może zawierać wyłącznie cyfry',
        ],
      }
  },
  computed: {
    categories () {
      return this.$store.getters.allCategories.map(category => ({ text: category.name, value: category['@id'] }) )
    }
  },
  beforeDestroy() {
    this.$store.dispatch('emptyEditPost')
  },
  methods: {
    submitForm () {
      if (this.$refs.addForm.validate()) {
        if (this.post) {
          this.$store.dispatch('editPost', {
              postId: this.post['@id'].match(/\d+/)[0],
              title: this.title,
              description: this.description,
              budget: Number(this.budget.match(/\d+/)[0]),  
              category: this.category
              // days: Number(this.days.match(/\d+/)[0])
          }).then(() => {
            this.$store.dispatch('closeAddForm')
          })
        } else {
          this.$store.dispatch('createPost', {
              title: this.title,
              description: this.description,
              budget: Number(this.budget.match(/\d+/)[0]),  
              days: Number(this.days.match(/\d+/)[0])
          }).then(() => {
            this.$store.dispatch('closeAddForm')
          })
        }
      }
    }
  }
}
</script>
<style lang="css">
  .shadow-text1 {
    text-shadow: 2px 2px 2px black; 
  }
</style>
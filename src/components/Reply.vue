<template>
    <v-card class="my-2" :elevation="(link) ? 3 : 2" min-height="180">
        <div v-if="link" class="grey lighten-2 px-3 py-2 d-flex">
            <v-icon left class="pr-2">mdi-xbox-controller</v-icon>
            <div>
              <router-link class="body-1 title-link-active" :to="link">Zlecę przebudowę strony internetowej</router-link>
              <div class="overline text-none active">Opublikowano 26-01-2020</div>
            </div>
        </div>
        <v-divider v-if="link" />
        <v-row no-gutters align="stretch" justify="center">
            <v-col sm="3" class="text-center py-sm-1">   
                <div class="d-flex align-center d-sm-block">
                    <v-avatar :size="this.$vuetify.breakpoint.smAndUp ? 70 : 40" color="grey lighten-4" class="my-3 mx-4 mx-sm-0">
                        <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="User avatar">
                    </v-avatar>
                    <div :class="this.$vuetify.breakpoint.smAndUp ? 'title' : 'font-weight-medium'">Jan Kowalski</div>
                    <v-chip label small :outlined="!this.$vuetify.breakpoint.smAndUp" color="warning" class="ma-1 mx-4 mx-sm-0 text-no-wrap">Firma</v-chip>    
                    <div class="ml-auto d-sm-none">
                          Cena: <span class="title mx-2">400 zł</span>
                          <span class="subtitle-1 mr-4">za całość</span>
                    </div>
                </div>
                <v-divider class="d-block d-sm-none mb-2"></v-divider>
            </v-col>
            <v-col cols="auto" sm="6" class="pt-sm-4">
                <div class="body-2 font-weight-medium d-none d-sm-block">Odpowiedź</div>
                <v-divider class="my-1 d-none d-sm-block"></v-divider>
                <div class="mx-1 mx-sm-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed debitis deleniti rem consequatur architecto aliquam, soluta unde amet culpa accusantium molestiae sapiente recusandae ducimus, quos fuga minus ullam. Laborum, minima.</div>
                <div class="d-flex justify-space-between align-center">
                  <v-chip-group class="pb-2 pt-3 pt-sm-0">
                    <v-chip outlined>Wystawiam fakturę VAT</v-chip>
                    <v-chip outlined>Umowa o dzieło</v-chip>
                  </v-chip-group>
                  <div class="mr-3 d-sm-none">
                    <Menu :items="items"></Menu>
                  </div>
                </div>
            </v-col>
            <v-col sm="3" class="text-center pt-sm-4">
                <div class="d-flex flex-column fill-height justify-space-between">
                    <div class="d-none d-sm-block">
                        <div class="body-2 font-weight-medium d-none d-sm-block">Cena</div>
                        <v-divider class="my-1 d-none d-sm-block"></v-divider>
                        <div class="d-none d-sm-block">
                          <div class="d-block d-sm-none">Cena</div>
                          <div class="title pt-2 mx-3 mx-sm-0">400 zł</div>
                          <div class="subtitle-1">za całość</div>
                        </div>
                    </div>
                    <div class="mr-2 mb-3 ml-auto d-none d-sm-block">
                      <Menu :items="items"></Menu>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import Menu from '@/components/Menu.vue';

export default {
    components: {
      Menu
    },
    props: {
      link: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        items: [
          { title: 'Kopiuj link', icon: 'smi-link' },
          { title: 'Edytuj', icon: 'smi-pencil' },
          { title: 'Usuń', icon: 'smi-trash-can-outline' },
          { title: 'Zgłoś', icon: 'smi-alert-circle-outline' },
        ],
      }
    }
}
</script>
<style lang="css">
    
</style>
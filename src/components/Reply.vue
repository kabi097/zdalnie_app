<template>
    <v-card class="my-2" min-height="180">
        <v-layout wrap align-stretch justify-center>
            <v-flex md3 class="text-center py-md-1">   
                <div class="d-flex align-center d-md-block">
                    <v-avatar :size="this.$vuetify.breakpoint.mdAndUp ? 70 : 40" color="grey lighten-4" class="my-3 mx-4 mx-md-0">
                        <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="User avatar">
                    </v-avatar>
                    <div :class="this.$vuetify.breakpoint.mdAndUp ? 'title' : 'font-weight-medium'">Jan Kowalski</div>
                    <v-chip label small :outlined="!this.$vuetify.breakpoint.mdAndUp" color="warning" class="ma-1 mx-4 mx-md-0">Firma</v-chip>    
                    <div class="ml-auto d-md-none">
                          Cena: <span class="title mx-2">400 zł</span>
                          <span class="subtitle-1 mr-4">za całość</span>
                    </div>
                </div>
                <v-divider class="d-block d-md-none mb-2"></v-divider>
            </v-flex>
            <v-flex md6 class="pt-md-4">
                <div class="body-2 font-weight-medium d-none d-md-block">Odpowiedź</div>
                <v-divider class="my-1 d-none d-md-block"></v-divider>
                <div class="mx-1 mx-md-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed debitis deleniti rem consequatur architecto aliquam, soluta unde amet culpa accusantium molestiae sapiente recusandae ducimus, quos fuga minus ullam. Laborum, minima.</div>
                <div class="d-flex justify-space-between align-baseline">
                  <v-chip-group class="pb-2 pt-3 pt-md-0">
                      <v-chip outlined>Wystawiam fakturę VAT</v-chip>
                      <v-chip outlined>Umowa o dzieło</v-chip>
                  </v-chip-group>
                  <div class="mr-2 d-md-none">
                    <Menu :items="items"></Menu>
                  </div>
                </div>
            </v-flex>
            <v-flex md3 class="text-center pt-md-4">
                <v-layout column style="height: 100%">
                    <v-flex md10 d-none d-md-block>
                        <div class="body-2 font-weight-medium d-none d-md-block">Cena</div>
                        <v-divider class="my-1 d-none d-md-block"></v-divider>
                        <div class="d-none d-md-block">
                          <div class="d-block d-md-none">Cena</div>
                          <div class="title pt-2 mx-3 mx-md-0">400 zł</div>
                          <div class="subtitle-1">za całość</div>
                        </div>
                    </v-flex>
                    <v-flex xs12 md2 align-self-end class="mr-2 mb-3 d-none d-md-block">
                        <Menu :items="items"></Menu>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
import Menu from '@/components/Menu.vue';

export default {
    components: {
      Menu
    },
    data() {
      return {
        items: [
          { title: 'Kopiuj link', icon: 'mdi-link' },
          { title: 'Edytuj', icon: 'mdi-pencil' },
          { title: 'Usuń', icon: 'mdi-trash-can-outline' },
          { title: 'Zgłoś', icon: 'mdi-alert-circle-outline' },
        ],
      }
    }
}
</script>
<style lang="css">
    
</style>
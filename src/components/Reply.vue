<template>
    <v-card class="my-2" min-height="180">
        <v-layout wrap align-stretch justify-center>
            <v-flex md3 class="text-center py-1">    
                <div class="d-sm-flex align-sm-center justify-sm-center d-md-block">
                    <v-avatar size="70" color="grey lighten-4" class="my-3">
                        <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="User avatar">
                    </v-avatar>
                    <div class="title">Jan Kowalski</div>
                    <v-chip label small color="warning" class="ma-1">Firma</v-chip>    
                </div>
            </v-flex>
            <v-flex md6 class="pt-4">
                <div class="body-2 font-weight-medium">Odpowiedź</div>
                <v-divider class="my-1"></v-divider>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed debitis deleniti rem consequatur architecto aliquam, soluta unde amet culpa accusantium molestiae sapiente recusandae ducimus, quos fuga minus ullam. Laborum, minima.
                <v-chip-group class="pb-2">
                    <v-chip outlined>Wystawiam fakturę VAT</v-chip>
                    <v-chip outlined>Umowa o dzieło</v-chip>
                </v-chip-group>
            </v-flex>
            <v-flex md3 class="text-center pt-4">
                <v-layout column style="height: 100%">
                    <v-flex xs10>
                        <div class="body-2 font-weight-medium">Cena</div>
                        <v-divider class="my-1"></v-divider>
                        <div class="title pt-2">400 zł</div>
                        <div class="subtitle-1">za całość</div>
                    </v-flex>
                    <v-flex xs2 align-self-end class="mr-2">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn rounded v-on="on" light icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item v-for="(item, index) in items" :key="index" @click="">
                            <v-list-item-title>
                              <v-icon class="mr-3" v-text="item.icon"></v-icon>{{ item.title }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-card>
</template>
<script>
export default {
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
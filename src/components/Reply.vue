<template>
    <v-card class="my-2" :elevation="(link) ? 3 : 2" min-height="180">
        <div v-if="link" class="grey lighten-2 px-3 py-2 d-flex">
            <v-icon left class="pr-2">mdi-xbox-controller</v-icon>
            <div>
              <router-link class="body-1 title-link-active" :to="link"></router-link>
              <div class="overline text-none active">Opublikowano {{ reply.createdAtAgo }}</div>
            </div>
        </div>
        <v-divider v-if="link" />
        <v-row no-gutters align="stretch" justify="center">
            <v-col sm="3" class="text-center py-sm-1">   
                <div class="d-flex align-center d-sm-block">
                    <v-avatar :size="this.$vuetify.breakpoint.smAndUp ? 70 : 40" color="grey lighten-4" class="my-3 mx-4 mx-sm-0">
                        <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="User avatar">
                    </v-avatar>
                    <div :class="this.$vuetify.breakpoint.smAndUp ? 'title' : 'font-weight-medium'">{{ reply.user.username }}</div>
                    <v-chip label small :outlined="!this.$vuetify.breakpoint.smAndUp" :color="reply.user.type ? 'warning' : 'primary'" class="ma-1 mx-4 mx-sm-0 text-no-wrap">{{ reply.user.type ? 'Firma' : 'Osoba prywatna' }}</v-chip>    
                    <div class="ml-auto d-sm-none">
                          Cena: <span class="title mx-2">{{ reply.price }} zł</span>
                          <span class="subtitle-1 mr-4">{{ reply.type }}</span>
                    </div>
                </div>
                <v-divider class="d-block d-sm-none mb-2"></v-divider>
            </v-col>
            <v-col cols="auto" sm="6" class="pt-sm-4">
                <div class="body-2 font-weight-medium d-none d-sm-block">Odpowiedź</div>
                <v-divider class="my-1 d-none d-sm-block"></v-divider>
                <div class="mx-1 mx-sm-0" style="min-height: 65px">{{ reply.content }}</div>
                <div class="d-flex justify-space-between align-center">
                  <v-chip-group class="pb-2 pt-3 pt-sm-0">
                    <!-- <v-chip outlined>Wystawiam fakturę VAT</v-chip>
                    <v-chip outlined>Umowa o dzieło</v-chip> -->
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
                          <div class="title pt-2 mx-3 mx-sm-0">{{ reply.price }} zł</div>
                          <div class="subtitle-1">{{ reply.type }}</div>
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
      },
      reply: {
        type: Object,
        default: () => {}
      },
      postId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        items: [
          { title: 'Kopiuj link', icon: 'mdi-link', click: () => console.log('Copy link') },
          { title: 'Edytuj', icon: 'mdi-pencil', click: () => this.$emit('edit-reply', this.reply['@id']) },
          { 
            title: 'Usuń', 
            icon: 'mdi-trash-can-outline', 
            click: () => this.$store.dispatch('deleteReply', { postId: this.postId, replyId: this.reply['@id'] })
          },
          { title: 'Zgłoś', icon: 'mdi-alert-circle-outline', click: () => console.log('Copyaa') },
        ]
      }
    }
}
</script>
<style lang="css">
    
</style>
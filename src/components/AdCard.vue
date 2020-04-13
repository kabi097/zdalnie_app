<template>
  <v-card>
    <v-row align="stretch" class="card-color mb-3 mx-0 px-0">
      <v-col cols="12" xs="12" md="7" class="pr-4">
        <div class="title">
          <v-icon class="pr-2">{{ post.category.icon }}</v-icon>
          <router-link class="title-link-active" :to="link">{{ post.title }}</router-link>
        </div>
        <router-link class="text-link-active" :to="link">
          <div class="overline text-none my-1 active">Aktywne od {{ post.createdAtAgo.replace(/temu/, '') }}</div>
          <div class="body-2 my-2 crop">{{ post.description }}</div>
        </router-link>
          <v-chip-group column>
            <v-chip small class="mr-1">{{ post.category.name }}</v-chip>
            <!-- <v-chip small class="mr-1">CSS</v-chip>
            <v-chip small class="mr-1">PHP</v-chip>
            <v-chip small class="mr-1">Laravel</v-chip>
            <v-chip small class="mr-1">REST API</v-chip> -->
          </v-chip-group>
      </v-col>
      <v-col cols="12" md="5">
        <v-row class="fill-height" no-gutters align="center" align-content="space-between" justify="space-between">
          <v-col xs="10" md="12">
            <v-row no-gutters>
              <v-col xs="6" sm="4" md="4" class="px-md-3">
                <div class="grey--text">Budżet</div>
                <div>{{ post.budget }}zł</div>
              </v-col>
              <v-col xs="6" sm="4" md="4" class="px-md-3">
                <div class="grey--text">Liczba ofert</div>
                <div>{{ post.replies.length }}</div>
              </v-col>
              <v-col xs="6" sm="4" md="4">
                <div class="grey--text">Pozostało</div>
                <div>{{ post.leftDays.replace(/za|temu/, '') }}</div>
              </v-col>
            </v-row>
          </v-col>
          <v-col xs="2" class="col-auto ml-auto">
            <Menu :items="items" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import Menu from '@/components/Menu.vue';
import { mapState } from 'vuex';

export default {
    components: {
      Menu
    },
    props: {
      post: {
        type: Object,
        default: () => {}
      },
      showAdminOptions: {
        type: Boolean,
        default: false
      },
      link: {
        default: '#'
      }
    },
    data() {
      return {
        items: [
          { title: 'Kopiuj link', icon: 'mdi-link', click: () => console.log('Copy link') },
          { title: 'Zgłoś', icon: 'mdi-alert-circle-outline', click: () => console.log('Copyaa') },
        ],
      }
    },
    mounted () {
      if (this.post.user['@id'].match(/\d+/)[0]==this.currentUser || this.isAdmin) {
        this.items.push(
        { 
          title: 'Usuń', 
          icon: 'mdi-trash-can-outline', 
          click: () => this.$store.dispatch('deletePost', this.post['@id'])
        },
        {
          title: 'Edytuj', 
          icon: 'mdi-pencil', 
          click: () => this.openEditForm()
        }
        );
      }
    },
    computed: mapState(['currentUser', 'isAdmin']),
    methods: {
      deletePost (id) {
        this.$store.dispatch('deletePost', id)
      },
      openEditForm () {
        this.$store.dispatch('toggleOverlay', false)
        if (this.$store.state.currentUser && this.$store.state.token) {
          this.$store.dispatch('openEditForm', this.post)
        } else {
          this.$store.dispatch('openLoginForm')
        }
      }
    }
}
</script>
<style lang="css">
  .card-color {
      border-left: 3px solid red;
  }

  .crop {
    overflow:hidden;
    height:60px;
  }
</style>

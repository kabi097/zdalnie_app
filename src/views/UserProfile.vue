<template>
  <v-container>
      <v-row no-gutters>
          <v-col cols="6" md="3" order="0" order-md="0"> 
            <v-btn class="my-2 text-none text-left font-weight-regular" text @click="$router.back()">
              <v-icon left>mdi-arrow-left</v-icon>
              Wróć do listy wyszukiwań
            </v-btn>
          </v-col>
          <v-col cols="6" md="9" order="1" order-md="1"> 
            <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
          </v-col>
          <v-col cols="12" md="3" order="2" order-md="2"> 
            <ProfileCard :user="user" />
            <div class="mr-md-4">
              <v-btn block class="mb-3" color="primary">Napisz wiadomość</v-btn>
              <v-btn block class="mb-3" color="warning">Edytuj</v-btn>
              <v-btn block class="mb-3">Zgłoś użytkownika</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="9" order="3" order-md="3">
            <v-card>
              <div class="pa-4 mb-3">
                  <div class="title">
                    <v-icon left size="40">mdi-account-circle</v-icon>
                    Profil użytkownika {{ user.login }}
                  </div>
                  <v-divider class="my-3" />
                  <div class="body-2 pb-3 font-weight-medium">Opis</div>
                  <div class="font-weight-regular pb-2">
                    {{ user.descripion }}
                  </div>
                  <v-row no-gutters>
                      <v-col xs="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Numer telefonu</div>
                        <div class="font-weight-regular pb-2">
                            {{ user.publicPhone }}
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Adres e-mail</div>
                        <div class="font-weight-regular pb-2">{{ user.publicEmail }}</div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Liczba opublikowanych zleceń</div>
                        <div class="font-weight-regular pb-2">
                          <v-chip v-if="!user.posts.length">brak</v-chip>
                          <div v-else>{{ user.posts.length }}</div>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Liczba opublikowanych odpowiedzi</div>
                        <div class="font-weight-regular pb-2">
                          <v-chip v-if="!user.replies.length">brak</v-chip>
                          <div v-else>{{ user.replies.length }}</div>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Adres</div>
                        <div class="font-weight-regular pb-2">
                            <!-- <v-chip-group>
                                <v-chip small class="mr-1">HTML</v-chip>
                                <v-chip small class="mr-1">CSS</v-chip>
                                <v-chip small class="mr-1">PHP</v-chip>
                                <v-chip small class="mr-1">Laravel</v-chip>
                                <v-chip small class="mr-1">REST API</v-chip>
                            </v-chip-group> -->
                            {{ user.publicAddress }}
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Odnośniki</div>
                        <div class="font-weight-regular pb-2">FB</div>
                      </v-col>
                  </v-row>
              </div>
            </v-card>
            <v-divider class="mt-6 mb-3 mx-1" />
            <div class="title my-4">Zlecenia użytkownika Jan Kowalski</div>
                <ad-card v-for="post in user.posts" :key="post['@id']" :post="post" :link="{ name: 'post', params: { post_id: post['@id'].match(/\d+/)[0]}}" />
            <!-- <v-divider class="mt-6 mb-3" />
            <div class="title my-4 mx-1">Odpowiedzi użytkownika Jan Kowalski</div>
            <reply v-for="reply in user.replies" :key="reply['@id']" :reply="reply" link="/example"/> -->
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import ReplyForm from '@/components/ReplyForm.vue';
import Reply from '@/components/Reply.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import AdCard from '@/components/AdCard.vue';

export default {
  components: {
    ReplyForm,
    Reply,
    ProfileCard,
    AdCard
  },
  data: () => ({
    breadcrumbs: [{
        text: 'Strona główna',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Profil użytkownika Jan Kowalski',
        disabled: false,
        href: '#',
      },
    ],
  }),
  computed: {
    user () {
      return this.$store.getters.userData
    },
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    currentUser () {
      return this.$store.getters.currentUser
    },
    isAdmin () {
      return this.$store.getters.isAdmin
    },
  },
  mounted () {
      this.$store.dispatch('getUserData', this.$route.path)      
  },
}
</script>

<style>
    .card-color-blue {
        border-left: 3px solid blue;
    }

    .card-color-yellow {
        border-left: 3px solid yellow;
    }

    .card-full {
      height: 100px; 
      background-color: blue;
    }
</style>
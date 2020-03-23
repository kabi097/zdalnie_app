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
            <v-skeleton-loader v-if="!userData" type="card-avatar" class="mr-3" />
            <ProfileCard v-else :user="userData" />
            <div class="mr-md-4">
              <v-btn block class="mb-3" color="primary">Napisz wiadomość</v-btn>
              <v-btn block class="mb-3" color="warning">Edytuj</v-btn>
              <v-btn block class="mb-3">Zgłoś użytkownika</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="9" order="3" order-md="3">
            <v-skeleton-loader v-if="!userData" type="card" />
            <v-card v-else>
              <div class="pa-4 mb-3">
                  <div class="title">
                    <v-icon left size="40">mdi-account-circle</v-icon>
                    Profil użytkownika {{ userData.login }}
                  </div>
                  <v-divider class="my-3" />
                  <div class="body-2 pb-3 font-weight-medium">Opis</div>
                  <div class="font-weight-regular pb-2">
                    {{ userData.descripion }}
                  </div>
                  <v-row no-gutters>
                      <v-col xs="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Numer telefonu</div>
                        <div class="font-weight-regular pb-2">
                            {{ userData.publicPhone }}
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Adres e-mail</div>
                        <div class="font-weight-regular pb-2">{{ userData.publicEmail }}</div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Liczba opublikowanych zleceń</div>
                        <div class="font-weight-regular pb-2">
                          <v-chip v-if="!userData.posts.length">brak</v-chip>
                          <div v-else>{{ userData.posts.length }}</div>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="body-2 py-3 font-weight-medium">Liczba opublikowanych odpowiedzi</div>
                        <div class="font-weight-regular pb-2">
                          <v-chip v-if="!userData.replies.length">brak</v-chip>
                          <div v-else>{{ userData.replies.length }}</div>
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
                            {{ userData.publicAddress }}
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
            <v-tabs v-model="tab" grow class="mb-2">
              <v-tab>Zlecenia</v-tab>
              <v-tab>Odpowiedzi</v-tab>            
              <v-tabs-items v-model="tab" class="mt-2">
                <v-tab-item>
                    <v-skeleton-loader v-if="!userPosts" type="card@5" />
                    <ad-card v-else v-for="post in userPosts" :key="post['@id']" :post="post" :link="{ name: 'post', params: { post_id: post['@id'].match(/\d+/)[0]}}" />
                    <div class="text-center">
                      <v-pagination
                        v-model="pagePosts"
                        :length="paginationLengthUserPosts"
                      ></v-pagination>
                    </div>
                </v-tab-item>
                <v-tab-item>
                  <v-skeleton-loader v-if="!userReplies" type="card@5" />
                  <reply v-else v-for="reply in userReplies" :key="reply['@id']" :reply="reply" :post="reply.post" />
                  <div class="text-center">
                      <v-pagination
                        v-model="pageReplies"
                        :length="paginationLengthUserReplies"
                      ></v-pagination>
                    </div>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-col>
      </v-row>
      <settings />
  </v-container>
</template>

<script>
import ReplyForm from '@/components/ReplyForm.vue';
import Reply from '@/components/Reply.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import AdCard from '@/components/AdCard.vue';
import Settings from '@/components/Settings.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    ReplyForm,
    Reply,
    ProfileCard,
    AdCard,
    Settings
  },
  data: () => ({
    breadcrumbs: [
      {
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
    pagePosts: 1,
    pageReplies: 1,
    tab: 0
  }),
  computed: mapGetters(['userData', 'loggedIn', 'currentUser', 'isAdmin', 'userPosts', 'userReplies', 'paginationLengthUserPosts', 'paginationLengthUserReplies']),
  mounted () {
      this.$store.dispatch('getUserData', this.$route.path)
      this.$store.dispatch('getUserPosts', { user_id: this.$route.path, page: this.page})    
  },
  watch: {
    pagePosts (pageNumber) {
      this.$store.dispatch('getUserPosts', { user_id: this.$route.path, page: pageNumber})
    },
    pageReplies (pageNumber) {
      this.$store.dispatch('getUserReplies', { user_id: this.$route.path, page: pageNumber})
    },
    tab (tabNumber) {
      if (tabNumber==1) {
        if (!this.userReplies || this.userReplies.length == 0 || this.userReplies[0].user['@id'] != this.userData['@id']) {
          this.$store.dispatch('getUserReplies', { user_id: this.$route.path, page: 1})
        }
      } else {        
        if (!this.userPosts || this.userPosts.length == 0 || this.userPosts[0].user['@id'] != this.userData['@id']) {
          this.$store.dispatch('getUserPosts', { user_id: this.$route.path, page: 1})
        }
      }
    }
  }
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
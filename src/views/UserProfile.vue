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
              <v-btn block class="mb-3" color="warning" @click="enableEditMode">Edytuj</v-btn>
              <v-btn block class="mb-3">Zgłoś użytkownika</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="9" order="3" order-md="3">
            <v-skeleton-loader v-if="!userData" type="card" />
            <v-card v-else>
              <v-form ref="userProfileForm" v-model="valid" class="pa-2 my-2">
                <div class="pa-4 mb-3">
                    <div class="title d-flex justify-space-between">
                      <div>
                        <v-icon left size="40">mdi-account-circle</v-icon>
                        <span v-if="!editMode">Profil użytkownika {{ userData.login }}</span>
                        <span v-else>Edycja użytkownika {{ userData.login }}</span>
                      </div>
                      <v-btn v-if="!editMode" @click="enableEditMode" color="primary" outlined>
                        <v-icon left>mdi-pencil</v-icon>
                        Edytuj
                      </v-btn>
                      <div class="d-flex" v-else>
                        <v-btn @click="disableEditMode" class="mx-2" color="error">
                          <v-icon :left="this.$vuetify.breakpoint.mdAndUp">mdi-close</v-icon>
                          <div v-show="this.$vuetify.breakpoint.mdAndUp">Anuluj</div>
                        </v-btn>
                        <v-btn @click="sendData" class="mx-2" color="success">
                          <v-icon :left="this.$vuetify.breakpoint.mdAndUp">mdi-content-save</v-icon>
                          <div v-show="this.$vuetify.breakpoint.mdAndUp">Zatwierdź</div>
                        </v-btn>
                      </div>
                    </div>
                    <v-divider class="my-3" />
                    <div class="body-2 pb-3 font-weight-medium">Opis</div>
                    <v-textarea v-if="editMode" filled name="description" v-model="editData.description" placeholder="Tutaj wpisz tekst" />
                    <div v-else class="font-weight-regular pb-2 font-italic">
                      {{ userData.description || "brak" }}
                    </div>
                    <v-row :no-gutters="!editMode">
                        <v-col v-if="editMode" cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Zdjęcie profilowe</div>
                          <v-file-input label="Zdjęcie profilowe" filled prepend-icon="mdi-camera"></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Nazwa firmy</div>
                          <div v-if="!editMode" class="font-weight-regular pb-2 font-italic">{{ userData.login }}</div>
                          <v-text-field filled v-model="editData.username" prepend-inner-icon="mdi-card-account-details-outline" name="companyName" placeholder="Nazwa firmy" v-else></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Adres firmy</div>
                          <div v-if="!editMode" class="font-weight-regular pb-2 font-italic">
                              {{ userData.publicAddress || "brak" }}
                          </div>
                          <v-text-field prepend-inner-icon="mdi-domain" v-model="editData.publicAddress" filled name="publicAddress" placeholder="Adres" v-else>{{ userData.publicAddress }}</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Numer telefonu</div>
                          <div v-if="!editMode" class="font-weight-regular pb-2 font-italic">
                              {{ userData.publicPhone || "brak" }}
                          </div>
                          <v-text-field filled v-model="editData.publicPhone" prepend-inner-icon="mdi-phone" name="publicPhone" placeholder="Numer telefonu" v-else>{{ userData.publicPhone }}</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Adres e-mail</div>
                          <div v-if="!editMode" class="font-weight-regular pb-2 font-italic">{{ userData.publicEmail || "brak" }}</div>
                          <v-text-field :rules="emailRules" v-model="editData.publicEmail" filled prepend-inner-icon="mdi-email" name="publicEmail" placeholder="Adres emails" v-else>{{ userData.publicEmail }}</v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Słowa kluczowe</div>
                          <v-chip-group v-if="!editMode">
                              <v-chip small class="mr-1">HTML</v-chip>
                              <v-chip small class="mr-1">CSS</v-chip>
                              <v-chip small class="mr-1">PHP</v-chip>
                              <v-chip small class="mr-1">Laravel</v-chip>
                              <v-chip small class="mr-1">REST API</v-chip>
                          </v-chip-group>
                          <tag-selector v-else filled prepend-inner-icon="mdi-tag" placeholder="Słowa kluczowe" />
                        </v-col>
                        <v-col v-if="!editMode" cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Odnośniki</div>
                          <div class="font-weight-regular pb-2">
                            <div v-if="userData.website || userData.facebook || userData.twitter || userData.github || userData.youtube">
                              <a v-if="userData.website" :href="userData.website">
                                <v-btn icon>
                                  <v-icon color="blue">mdi-earth</v-icon>
                                </v-btn>
                              </a>
                              <a v-if="userData.facebook" :href="userData.facebook">
                                <v-btn icon>
                                  <v-icon color="primary">mdi-facebook</v-icon>
                                </v-btn>
                              </a>
                              <a v-if="userData.twitter" :href="userData.twitter">
                                <v-btn icon>
                                  <v-icon color="light-blue">mdi-twitter</v-icon>
                                </v-btn>
                              </a>
                              <a v-if="userData.linkedin" :href="userData.linkedin">
                                <v-btn icon>
                                  <v-icon color="indigo">mdi-linkedin</v-icon>
                                </v-btn>
                              </a>
                              <a v-if="userData.github" :href="userData.github">
                                <v-btn icon>
                                  <v-icon color="black">mdi-github</v-icon>
                                </v-btn>
                              </a>
                              <a v-if="userData.youtube" :href="userData.youtube">
                                <v-btn icon>
                                  <v-icon color="red">mdi-youtube</v-icon>
                                </v-btn>
                              </a>
                            </div>
                            <i v-else>brak</i>
                          </div>
                        </v-col>
                        <v-col v-if="editMode" cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Strona WWW</div>
                          <v-text-field :rules="websiteRules" v-model="editData.website" filled prepend-inner-icon="mdi-earth" name="website-url" placeholder="Adres strony WWW"></v-text-field>                        
                        </v-col>
                        <v-col v-if="editMode" cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Profil Facebook</div>
                          <v-text-field :rules="facebookRules" v-model="editData.facebook" prepend-inner-icon="mdi-facebook" filled name="facebook-url" placeholder="Link do profilu Facebook"></v-text-field>                        
                        </v-col>
                        <v-col v-if="editMode" cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Profil LinkedIn</div>
                          <v-text-field :rules="linkedinRules" v-model="editData.linkedin" prepend-inner-icon="mdi-linkedin" filled name="linkedin-url" placeholder="Link do profilu LinkedIn"></v-text-field>                        
                        </v-col>
                        <v-col v-if="editMode" cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Profil GitHub</div>
                          <v-text-field :rules="githubRules" v-model="editData.github" prepend-inner-icon="mdi-github" filled name="github-url" placeholder="Link do profilu GitHub"></v-text-field>                        
                        </v-col>
                        <v-col v-if="editMode" cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Profil YouTube</div>
                          <v-text-field :rules="youtubeRules" v-model="editData.youtube" prepend-inner-icon="mdi-youtube" filled name="youtube-url" placeholder="Link do profilu YouTube"></v-text-field>                        
                        </v-col>
                        <v-col v-if="!editMode" cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Liczba opublikowanych zleceń</div>
                          <div class="font-weight-regular pb-2">
                            <v-chip v-if="!userData.posts.length">brak</v-chip>
                            <div v-else>{{ userData.posts.length }}</div>
                          </div>
                        </v-col>
                        <v-col v-if="!editMode" cols="12" sm="6">
                          <div class="body-2 py-3 font-weight-medium">Liczba opublikowanych odpowiedzi</div>
                          <div class="font-weight-regular pb-2">
                            <v-chip v-if="!userData.replies.length">brak</v-chip>
                            <div v-else>{{ userData.replies.length }}</div>
                          </div>
                        </v-col>
                    </v-row>
                </div>
              </v-form>
            </v-card>
            
            <v-divider class="mt-6 mb-3 mx-1" />
            <v-tabs v-model="tab" grow class="mb-2">
              <v-tab>Zlecenia</v-tab>
              <v-tab>Odpowiedzi</v-tab>            
              <v-tabs-items v-model="tab" class="mt-2">
                <v-tab-item>
                    <v-skeleton-loader v-if="userPosts==undefined" type="card@5" />
                    <div v-else-if="userPosts && userPosts.length > 0">
                      <ad-card v-for="post in userPosts" :key="post['@id']" :post="post" :link="{ name: 'post', params: { post_id: post['@id'].match(/\d+/)[0]}}" />
                      <div class="text-center">
                        <v-pagination
                          v-model="pagePosts"
                          :length="paginationLengthUserPosts"
                        />
                      </div>
                    </div>
                    <div v-else class="d-block py-5 text-center grey lighten-2">
                      <p class="title mt-2">Brak zleceń</p>
                    </div>
                </v-tab-item>
                <v-tab-item>
                  <v-skeleton-loader v-if="userReplies==undefined" type="card@5" />
                  <div v-else-if="userReplies && userReplies.length > 0">
                    <reply v-for="reply in userReplies" :key="reply['@id']" :reply="reply" :post="reply.post" />
                    <div class="text-center">
                        <v-pagination
                          v-model="pageReplies"
                          :length="paginationLengthUserReplies"
                        />
                      </div>
                  </div>
                  <div v-else class="d-block py-5 text-center grey lighten-2">
                    <p class="title mt-2">Brak odpowiedzi</p>
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import Reply from '@/components/Reply.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import AdCard from '@/components/AdCard.vue'
import TagSelector from '@/components/TagSelector.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Reply,
    ProfileCard,
    AdCard,
    TagSelector
  },
  data: () => ({
    editMode: false,
    valid: true,
    editData: {
      userId: null,
      username: '',
      publicEmail: '',
      publicPhone: '',
      publicAddress: '',
      description: '',
      website: '',
      facebook: '',
      github: '',
      linkedin: '',
      youtube: ''
    },
    contentRules: [
      v => !!v || 'Pole jest wymagane',
      v => (v && v.length >= 10) || 'Pole musi zawierać minimum 10 znaków',
    ],
    emailRules: [
      v => /.+@.+\..+/.test(v) || v == undefined || 'E-mail musi być poprawny',
    ],
    websiteRules: [
      v => {
        if (v == undefined || v.length == 0) return true
        try {
          new URL(v)
        } catch (_) {
          return 'Adres URL musi być poprawny'  
        }
        return true
      }
    ],
    linkedinRules: [
      v => {
        if (v == undefined || v.length == 0) return true
        try {
          let url = new URL(v)
          return !!url.hostname.match(/linkedin.com/)
        } catch (_) {
          return 'Adres URL musi być poprawny'  
        }
      }
    ],
    facebookRules: [
      v => {
        if (v == undefined || v.length == 0) return true
        try {
          let url = new URL(v)
          return !!url.hostname.match(/facebook.com/)
        } catch (_) {
          return 'Adres URL musi być poprawny'  
        }
      }
    ],
    githubRules: [
      v => {
        if (v == undefined || v.length == 0) return true
        try {
          let url = new URL(v)
          return !!url.hostname.match(/github.com/)
        } catch (_) {
          return 'Adres URL musi być poprawny'  
        }
      }
    ],
    youtubeRules: [
      v => {
        if (v == undefined || v.length == 0) return true
        try {
          let url = new URL(v)
          return !!url.hostname.match(/youtube.com/)
        } catch (_) {
          return false  
        }
      }
    ],
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
    tab: 0,
  }),
  methods: {
    enableEditMode () {
      if (this.loggedIn && (this.userData['@id'].match(/\d+/)[0] == this.currentUser || this.isAdmin)) {
        this.editData.userId = this.$route.path.match(/\d+/)[0]
        this.editData.username = this.userData.username
        this.editData.publicEmail = this.userData.publicEmail
        this.editData.publicPhone = this.userData.publicPhone
        this.editData.publicAddress = this.userData.publicAddress
        this.editData.description = this.userData.description
        this.editData.website = this.userData.website
        this.editData.facebook = this.userData.facebook
        this.editData.github = this.userData.github
        this.editData.linkedin = this.userData.linkedin
        this.editData.youtube = this.userData.youtube
        this.editMode = true
      } else {
        this.$store.dispatch('addNotification', {
          type: 'error',
          message: 'Nie masz uprawnień do edytowania tego profilu.',
        })
      }
    },
    disableEditMode () {
      this.editMode = false
    },
    sendData () {
      if (this.loggedIn && (this.userData['@id'].match(/\d+/)[0] == this.currentUser || this.isAdmin)) {      
        if (this.$refs.userProfileForm.validate()) {
          this.$store.dispatch('editUserData', this.editData)
          this.editMode = false
        }
      }
    }
  },
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
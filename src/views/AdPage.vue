<template>
  <v-container>
      <v-row v-if="post" no-gutters>
          <v-col cols="6" md="3" order="0" order-md="0"> 
            <v-btn @click="$router.back()" text class="my-2 text-none text-left font-weight-regular">
              <v-icon left>mdi-arrow-left</v-icon>
              Wróć do listy wyszukiwań
            </v-btn>
          </v-col>
          <v-col cols="6" md="9" order="1" order-md="1"> 
            <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
          </v-col>
          <v-col cols="12" md="3" order="2" order-md="2"> 
            <ProfileCard :user="post.user" :date="post.createdAt" />
            <div class="mr-md-4">
              <v-btn v-if="loggedIn && (currentUser == post.user['@id'].match(/\d+/)[0] || isAdmin)" @click="openEditForm" block class="mb-3" color="warning">Edytuj</v-btn>
              <v-btn v-if="loggedIn && (currentUser == post.user['@id'].match(/\d+/)[0] || isAdmin)" @click="deletePost" block class="mb-3" color="red">Kasuj</v-btn>
              <v-btn v-if="loggedIn && (currentUser == post.user['@id'].match(/\d+/)[0] || isAdmin)" block class="mb-3" color="green">Oznacz jako zakończone</v-btn>
              <v-btn block class="mb-3">Zgłoś ogłoszenie</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="9" order="3" order-md="3">
            <v-card>
              <v-toolbar flat dense>
                <v-toolbar-items>
                  <v-btn text :disabled="allPosts.length-1 < 1 || allPosts[0]['@id'] == post['@id']" @click="previousPost"><v-icon left>mdi-arrow-left</v-icon>Poprzedni</v-btn>
                </v-toolbar-items>
                <v-spacer />
                <v-toolbar-items>
                  <v-btn text :disabled="allPosts.length-1 < 1 || allPosts[allPosts.length-1]['@id'] == post['@id']" @click="nextPost">Następny<v-icon right>mdi-arrow-right</v-icon></v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-divider />
              <div class="pa-4 mb-3">
                  <div class="headline pb-2 font-weight-medium">
                    <v-icon class="pr-3">{{ post.category.icon }}</v-icon>
                    {{ post.title }}
                  </div>
                  <ul style="list-style: none; padding: 0">
                  <li><v-icon class="pr-4">mdi-cash</v-icon>
                  Budżet: {{ post.budget }} zł</li>

                  <li><v-icon class="pr-4">mdi-calendar-range</v-icon>
                  Pozostało: {{ post.leftDays.replace(/za|temu/, '') }}</li>

                  <li><v-icon class="pr-4">mdi-account-group</v-icon>
                  Liczba zgłoszeń: {{ post.replies.length }}</li>
                  </ul>
                  
                  <div class="body-2 py-3 font-weight-medium">Opis</div>
                  <div class="font-weight-regular pb-2">
                    {{ post.description }}
                  </div>
                  <div class="body-2 py-3 font-weight-medium">Kategoria</div>
                  <div class="font-weight-regular pb-2">
                    <v-chip-group>
                        <v-chip class="mr-1">{{ post.category.name }}</v-chip>
                        <!-- <v-chip small class="mr-1">CSS</v-chip>
                        <v-chip small class="mr-1">PHP</v-chip>
                        <v-chip small class="mr-1">Laravel</v-chip>
                        <v-chip small class="mr-1">REST API</v-chip> -->
                    </v-chip-group> 
                  </div>
              </div>
            </v-card>
            <reply-form v-if="loggedIn && !!currentUser && post.user['@id'].match(/\d+/)[0] !== currentUser && !(post.replies.length > 0 && post.replies.some(x => x.user['@id'].match(/\d+/)[0] == currentUser))"
              @submit-reply="sendReply"
             />
             <reply-form v-else-if="!!userReplyId" @close-edit="closeEdit" @submit-reply="sendReply" :edit="true" :editContent="content" :editPrice="price" :editType="type" />
             <reply v-for="reply in post.replies" :key="reply['@id']" :reply="reply" :post-id="post['@id']" @edit-reply="openEdit" />
             <div v-if="post.replies.length==0" class="d-block py-5 text-center grey lighten-2">
               <p class="title mt-2">Brak odpowiedzi</p>
               <p class="subtitle-1" v-if="!loggedIn">Zaloguj się, aby dodać odpowiedź</p>
              </div>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import ReplyForm from '@/components/ReplyForm.vue'
import Reply from '@/components/Reply.vue'
import ProfileCard from '@/components/ProfileCard.vue'

export default {
  components: {
    ReplyForm,
    Reply,
    ProfileCard
  },
  data: () => ({
    userReplyId: '',
    content: '',
    price: '',
    type: '',
    breadcrumbs: [{
        text: 'Strona główna',
        disabled: false,
        href: '#'
      },
      {
        text: 'Ogłoszenia',
        disabled: false,
        href: '#'
      }
    ],
  }),
  computed: {
    post () {
      return this.$store.getters.postData
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
    allPosts () {
      return this.$store.getters.allPosts
    }
  },
  mounted () {
      this.$store.dispatch('getPostData', this.$route.path)      
  },
  methods: {
    sendReply (data) {
      data.post = this.post['@id']
      data.price = parseInt(data.price, 10)
      if (this.userReplyId) {
        data.replyId = this.userReplyId
        this.$store.dispatch('editReply', data).then(() => this.closeEdit())
      } else {
        this.$store.dispatch('sendReply', data)
      }
    },
    openEdit (replyId) {
      if (this.loggedIn && (this.post.replies.length && this.post.replies.some(reply => reply['@id'] == replyId && reply.user['@id'].match(/\d+/)[0] == this.currentUser))) {
        const currentReply = this.post.replies.filter(reply => reply['@id'] == replyId && reply.user['@id'].match(/\d+/)[0] == this.currentUser)[0]
        this.userReplyId = currentReply['@id']
        this.content = currentReply.content
        this.price = currentReply.price
        this.type = currentReply.type
      }
    },
    deletePost () {
      if (this.loggedIn && (this.currentUser == this.post.user['@id'].match(/\d+/)[0] || this.isAdmin)) {
        this.$store.dispatch('deletePost', this.post['@id']).then(() => {
          this.$route.push('/')
        })
      }
    },
    closeEdit () {
      this.userReplyId = ''
      this.content = ''
      this.price = ''
      this.type = ''
    },
    previousPost () {
      console.log(this.allPosts)
      const currentIndex = this.allPosts.findIndex(post => post['@id'] == this.post['@id'])
      if (currentIndex > 0) {
        this.$router.push('/post/' + this.allPosts[currentIndex - 1]['@id'].match(/\d+/)[0])
        this.$store.dispatch('getPostData', this.$route.path)
      }
    },
    nextPost () {
      const currentIndex = this.allPosts.findIndex(post => post['@id'] == this.post['@id'])
      if (currentIndex >= 0 && currentIndex < this.allPosts.length - 1) {
        this.$router.push('/post/' + this.allPosts[currentIndex + 1]['@id'].match(/\d+/)[0])
        this.$store.dispatch('getPostData', this.$route.path)
      }
    },
    openEditForm () {
      this.$store.dispatch('toggleOverlay', false)
      if (this.$store.state.currentUser && this.$store.state.token) {
        this.$store.dispatch('openEditForm', this.post)
      } else {
        this.$store.dispatch('openLoginForm')
      }
    }
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
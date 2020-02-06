<template>
  <v-container>
      <v-row no-gutters>
          <v-col md="3" order="0" order-md="0"> 
            <v-btn @click="$router.push('/')" text class="my-2 text-none text-left font-weight-regular">
              <v-icon left>mdi-arrow-left</v-icon>
              Wróć do listy wyszukiwań
            </v-btn>
          </v-col>
          <v-col md="9" order="1" order-md="1"> 
            <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
          </v-col>
          <v-col md="3" order="2" order-md="2"> 
            <ProfileCard :user="post.user" :date="post.createdAt" />
            <div class="mr-md-4">
              <v-btn block class="mb-3" color="warning">Edytuj</v-btn>
              <v-btn block class="mb-3" color="red">Kasuj</v-btn>
              <v-btn block class="mb-3" color="green">Oznacz jako zakończone</v-btn>
              <v-btn block class="mb-3">Zgłoś ogłoszenie</v-btn>
            </div>
          </v-col>
          <v-col md="9" order="3" order-md="3">
            <v-card>
              <v-toolbar flat dense>
                <v-toolbar-items>
                  <v-btn text><v-icon left>mdi-arrow-left</v-icon>Poprzedni</v-btn>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn text>Następny<v-icon right>mdi-arrow-right</v-icon></v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-divider></v-divider>
              <div class="pa-4 mb-3">
                  <div class="headline pb-2 font-weight-medium">
                    <v-icon class="pr-3">{{ post.category.icon }}</v-icon>
                    {{ post.title }}
                  </div>
                  <ul style="list-style: none; padding: 0">
                  <li><v-icon class="pr-4">mdi-cash</v-icon>
                  Budżet: {{ post.budget }} zł</li>

                  <li><v-icon class="pr-4">mdi-calendar-range</v-icon>
                  Pozostało: {{ post.leftDays.replace('/za|temu/', '') }} </li>

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
            <reply-form v-if="(post.user['@id'].match(/\d+/) !== $store.state.currentUser.match(/\d+/)) && !(post.replies.length > 0 && post.replies.find(x => x.user['@id'].match(/\d+/) == $store.state.currentUser.match(/\d+/)))"
              @submit-reply="sendReply"
             />
            <reply v-for="reply in post.replies" :key="reply['@id']" :reply="reply" />
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import ReplyForm from '@/components/ReplyForm.vue';
import Reply from '@/components/Reply.vue';
import ProfileCard from '@/components/ProfileCard.vue';

export default {
  components: {
    ReplyForm,
    Reply,
    ProfileCard
  },
  computed: {
    post () {
      return this.$store.getters.postData
    }
  },
  methods: {
    sendReply (data) {
      console.log(this.post.replies)
      // data.post = this.post['@id']
      // data.price = parseInt(data.price, 10)
      // this.$store.dispatch('sendReply', data)
    }
  },
  // watch: {
  //   $route: function (to, from) {
  //     if (to.name=='category') {
  //       this.$store.dispatch('getPosts', to.path)
  //     } else {
  //       this.$store.dispatch('getPosts')
  //     }
  //   }
  // },
  mounted () {
      this.$store.dispatch('getPostData', this.$route.path)
  },
  data: () => ({
    breadcrumbs: [{
        text: 'Strona główna',
        disabled: false,
        href: '#',
      },
      {
        text: 'Posty',
        disabled: false,
        href: '#',
      }
    ],
  }),
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
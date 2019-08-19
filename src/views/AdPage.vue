<template>
  <v-container>
      <v-layout wrap>
          <v-flex md3> 
            <v-btn text class="my-2 text-none text-left font-weight-regular">
              <v-icon left>mdi-arrow-left</v-icon>
              Wróć do listy wyszukiwań
            </v-btn>
          </v-flex>
          <v-flex md9> 
            <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
          </v-flex>
          <v-flex md3> 
            
            <v-card class="mr-md-4 mb-3">
              <div class="pt-12 text-center" style="height: 100px; background-color: blue">
                <div class="pt-5 d-inline-block">
                  <v-avatar size="70" color="grey lighten-4">
                    <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="User avatar">
                  </v-avatar>
                </div>
              </div>
              <div class="text-center mt-12">
                <div class="display-1">Jan Kowalski</div>
                <v-chip label small color="primary" class="ma-2">Osoba prywatna</v-chip>
                <div class="py-3 caption">
                  Zarejestrowany: 3 miesiące temu
                  <v-divider class="my-2"></v-divider>
                  Dodano: 20-08-2019 22:31
                </div>
              </div>
            </v-card>
            <div class="mr-md-4">
              <v-btn block class="mb-3" color="warning">Edytuj</v-btn>
              <v-btn block class="mb-3" color="red">Kasuj</v-btn>
              <v-btn block class="mb-3" color="green">Oznacz jako zakończone</v-btn>
              <v-btn block class="mb-3">Zgłoś ogłoszenie</v-btn>
            </div>
          </v-flex>
          <v-flex md9>
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
                    <v-icon class="pr-3">mdi-xbox-controller</v-icon>
                    Zlecę przebudowę strony internetowej
                  </div>
                  <ul style="list-style: none; padding: 0">
                  <li><v-icon class="pr-4">mdi-cash</v-icon>
                  Budżet: 400 zł</li>

                  <li><v-icon class="pr-4">mdi-calendar-range</v-icon>
                  Pozostało: 4 dni</li>

                  <li><v-icon class="pr-4">mdi-account-group</v-icon>
                  Liczba zgłoszeń: 14</li>
                  </ul>
                  
                  <div class="body-2 py-3 font-weight-medium">Opis</div>
                  <div class="font-weight-regular pb-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis consequuntur sint, error dolor id saepe. Nisi itaque modi aliquam nesciunt sed, ipsam hic voluptas, quibusdam soluta cupiditate commodi natus? 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illo voluptates saepe, est laudantium autem nisi molestias magni facere, explicabo libero cumque officiis minima quas nostrum inventore velit a eius!
                    lorem
                  </div>
                  <div class="body-2 py-3 font-weight-medium">Umiejętności</div>
                  <div class="font-weight-regular pb-2">
                    <v-chip-group>
                        <v-chip small class="mr-1">HTML</v-chip>
                        <v-chip small class="mr-1">CSS</v-chip>
                        <v-chip small class="mr-1">PHP</v-chip>
                        <v-chip small class="mr-1">Laravel</v-chip>
                        <v-chip small class="mr-1">REST API</v-chip>
                    </v-chip-group>
                  </div>
              </div>
            </v-card>
            <reply-form></reply-form>
            <reply></reply>
            <reply></reply>
            <reply></reply>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import ReplyForm from '@/components/ReplyForm.vue';
import Reply from '@/components/Reply.vue';

export default {
  components: {
    ReplyForm,
    Reply,
  },
  data: () => ({
    breadcrumbs: [{
        text: 'Strona główna',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Informatyka',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'Witryny i aplikacje internetowe',
        disabled: false,
        href: 'breadcrumbs_link_2',
      },
    ],
  }),
}
</script>

<style>

</style>
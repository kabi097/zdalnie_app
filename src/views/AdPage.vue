<template>
  <v-container>
      <v-row no-gutters>
          <v-col md="3" order="0" order-md="0"> 
            <v-btn text class="my-2 text-none text-left font-weight-regular">
              <v-icon left>mdi-arrow-left</v-icon>
              Wróć do listy wyszukiwań
            </v-btn>
          </v-col>
          <v-col md="9" order="1" order-md="1"> 
            <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
          </v-col>
          <v-col md="3" order="2" order-md="2"> 
            <ProfileCard/>
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
    ProfileCard,
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
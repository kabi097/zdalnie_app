<template>
    <div>
        <div class="header">

        </div>
        <v-container>
            <v-card>
            <v-row no-gutters>
                <v-col cols="3">
                    <profile-card />
                </v-col>
                <v-col cols="9">
                    <v-tabs v-model="tab">
                        <v-tab>Profil</v-tab>
                        <v-tab>Ogłoszenia</v-tab>
                        <v-tab>Odpowiedzi</v-tab>
                        <v-tab>Ustawienia</v-tab>
                    </v-tabs>   
                    <div class="px-2 mb-3">
                        <div class="body-2 py-2 font-weight-medium">Opis</div>
                        <div class="font-weight-regular pb-2">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis consequuntur sint, error dolor id saepe. Nisi itaque modi aliquam nesciunt sed, ipsam hic voluptas, quibusdam soluta cupiditate commodi natus? 
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illo voluptates saepe, est laudantium autem nisi molestias magni facere, explicabo libero cumque officiis minima quas nostrum inventore velit a eius!
                            lorem</p>
                        </div>
                    </div>
                </v-col>
            </v-row>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import ProfileCard from '@/components/ProfileCard.vue';

export default {
    components: {
        ProfileCard,
    },
    data () {
        return {
            tab: null,
        }
    }
}
</script>
<style lang="css">
    
</style>
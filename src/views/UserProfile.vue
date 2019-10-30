<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="3">
                <profile-card />
            </v-col>
            <v-col cols="9">
                <v-card>
                    <v-tabs v-model="tab">
                        <v-tab>Profil</v-tab>
                        <v-tab>Ogłoszenia</v-tab>
                        <v-tab>Odpowiedzi</v-tab>
                        <v-tab>Ustawienia</v-tab>
                    </v-tabs>   
                    <v-tabs-items v-model="tab">
                        <v-tab-item>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, enim esse animi modi nobis assumenda quidem nesciunt quibusdam minus a atque nostrum optio repudiandae repellat cum voluptatum explicabo ullam sapiente.
                        </v-tab-item>
                        <v-tab-item>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, enim esse animi modi nobis assumenda quidem nesciunt quibusdam minus a atque nostrum optio repudiandae repellat cum voluptatum explicabo ullam sapiente.
                        </v-tab-item>
                        <v-tab-item>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, enim esse animi modi nobis assumenda quidem nesciunt quibusdam minus a atque nostrum optio repudiandae repellat cum voluptatum explicabo ullam sapiente.
                        </v-tab-item>
                        <v-tab-item>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, enim esse animi modi nobis assumenda quidem nesciunt quibusdam minus a atque nostrum optio repudiandae repellat cum voluptatum explicabo ullam sapiente.
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
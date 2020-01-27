<template>
    <v-card class="mr-md-5 mb-3">
        <div class="d-flex d-sm-block align-center">
            <div class="pt-sm-12 text-center card-color-blue" :class="this.$vuetify.breakpoint.smAndUp ? 'card-full' : ''">
                <div class="py-4 d-sm-inline-block">
                <v-avatar :size="this.$vuetify.breakpoint.smAndUp ? 70 : 45" color="grey lighten-4 mx-4">
                    <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="User avatar">
                </v-avatar>
                </div>
            </div>
            <div class="text-center mt-sm-12 d-flex d-sm-block">
                <router-link to="/profile" class="text-link-active">
                    <div class="mx-2 py-2">
                        <div :class="this.$vuetify.breakpoint.smAndUp ? 'display-1' : 'subtitle-1 font-weight-medium'">Jan Kowalski</div>
                        <v-chip label small color="primary" class="ma-sm-2">Osoba prywatna</v-chip>
                    </div>
                </router-link>
                <div class="py-3 mr-auto mx-4 caption d-block d-sm-block">
                    <div>Zarejestrowany: 3 miesiące temu</div>
                    <v-divider class="my-1 my-sm-2" />
                    <div>Dodano: 20-08-2019 22:31</div>
                </div>
            </div>
        </div>
    </v-card>
</template>
<script>
export default {
    
}
</script>
<style lang="css">
    
</style>
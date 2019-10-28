<template>
    <v-card>
        <v-form class="pa-2 my-2">
            <div class="title ma-2">Dodaj odpowiedź</div>
            <v-textarea filled label="Wpisz tutaj"></v-textarea>
            <v-row no-gutters>
                <v-col xs="6">
                    <v-text-field filled label="Cena" class="pr-1"></v-text-field>
                </v-col>
                <v-col xs="6">
                    <v-select filled label="Za" :items="['sztukę', 'całość', 'roboczogodzinę']" class="pl-1">
                    </v-select>
                </v-col>
            </v-row>
            <v-row no-gutters justify="space-between">
                <v-col cols="auto">
                    <v-chip-group
                        v-model="options"
                        multiple
                    >
                        <v-chip filter outlined>Wystawiam fakturę VAT</v-chip>
                        <v-chip filter outlined>Umowa o dzieło</v-chip>
                    </v-chip-group>
                </v-col>
                <v-col cols="12" sm="3" class="text-right mt-2 mr-md-4">
                    <v-btn color="primary" :block="!this.$vuetify.breakpoint.smAndUp">Wyślij</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        options: [],
    })
}
</script>
<style lang="css">
    
</style>
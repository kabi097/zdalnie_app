<template>
    <v-card>
        <v-form class="pa-2 my-2">
            <div class="title ma-2">Dodaj odpowiedź</div>
            <v-textarea filled label="Wpisz tutaj"></v-textarea>
            <v-layout>
                <v-flex xs6>
                    <v-text-field filled label="Cena" class="pr-1"></v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-select filled label="Za" :items="['sztukę', 'całość', 'roboczogodzinę']" class="pl-1">
                    </v-select>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex md9>
                    <v-chip-group
                        v-model="options"
                        multiple
                    >
                        <v-chip filter outlined>Wystawiam fakturę VAT</v-chip>
                        <v-chip filter outlined>Umowa o dzieło</v-chip>
                    </v-chip-group>
                </v-flex>
                <v-flex md3 xs12 block class="text-right mt-2 mr-4">
                    <v-btn color="primary">Wyślij</v-btn>
                </v-flex>
            </v-layout>
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
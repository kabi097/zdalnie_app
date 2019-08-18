<template>
    <v-card>
        <v-form class="pa-2">
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
                <v-flex md6>
                    <v-item-group>
                        <v-item v-slot:default="{ active, toggle }">Wystawiam fakturę VAT</v-item>
                    </v-item-group>
                </v-flex>
                <v-flex md3 xs12>
                    <v-btn color="primary float-right">Wyślij</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-card>
</template>
<script>
export default {
    
}
</script>
<style lang="css">
    
</style>
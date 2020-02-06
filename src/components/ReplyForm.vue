<template>
    <v-card>
        <v-form ref="replyForm" v-model="valid" class="pa-2 my-2">
            <div class="title ma-2">Dodaj odpowiedź</div>
            <v-textarea v-model="content" filled label="Wpisz tutaj" :rules="contentRules" required />
            <v-row no-gutters>
                <v-col xs="6">
                    <v-text-field v-model="price" filled label="Cena" class="pr-1" :rules="numberRules" required />
                </v-col>
                <v-col xs="6">
                    <v-select v-model="type" filled label="Za" :items="['sztukę', 'całość', 'roboczogodzinę']" class="pl-1" :rules="typeRules" required />
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
                    <v-btn @click="validateForm" color="primary" :block="!this.$vuetify.breakpoint.smAndUp">Wyślij</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        options: [],
        price: '',
        type: '',
        content: '',
        valid: true,
        contentRules: [
            v => !!v || 'Pole jest wymagane',
            v => (v && v.length >= 10) || 'Pole musi zawierać minimum 10 znaków',
        ],
        numberRules: [
            v => !!v || 'Pole jest wymagane',
            v => (parseInt(v, 10)) || 'Pole może zawierać wyłącznie cyfry'
        ],
        typeRules: [
            v => !!v || 'Pole jest wymagane'
        ]
    }),
    methods: {
        validateForm () {
            if (this.$refs.replyForm.validate()) {
                this.$emit('submit-reply', { price: this.price, type: this.type, content: this.content })
            }
        }
    }
}
</script>
<style lang="css">
    
</style>
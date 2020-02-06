<template>
     <v-container>
        <v-card light elevation="24">
            <v-card-title class="grey lighten-2 title">
                Zaloguj się
            </v-card-title>
            <v-card-text>
                <v-form ref="selectCategory" v-model="valid">
                    <v-radio-group :mandatory="true" v-model="selectedCategory">
                        <v-radio v-for="category in categories" :key="category['@id']" :label="category.name" :value="category['@id']" />
                    </v-radio-group>
                    <v-btn block @click="selectCategory">Potwierdź</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        valid: true,
        selectedCategory: ''
    }),
    computed: {
      categories () {
        return this.$store.getters.allCategories
      }
    },
    methods: {
        selectCategory () {
            if (this.$refs.selectCategory.validate() && !!this.selectedCategory) {
                this.$store.dispatch('setNewPostCategory', this.selectedCategory)
            }
        }
    }
}
</script>
<template>
    <v-autocomplete
        v-model="model"
        :items="items"
        :search-input.sync="search"
        color="white"
        hide-no-data
        :prepend-inner-icon="prependInnerIcon"
        :filled="filled"
        :placeholder="placeholder"
        hide-selected
        item-text="Description"
        item-value="API"
        return-object
    />
</template>
<script>
import axios from 'axios'

export default {
    props: {
        filled: {
            type: Boolean,
            required: false,
            default: false
        },
        prependInnerIcon: {
            type: String,
            required: false,
            default: null
        },
        placeholder: {
            type: String,
            required: false,
            default: ''
        }
    },
    data: () => ({
        model: null,
        entries: [],
        search: ''
    }),
    computed: {
      items () {
        return this.entries.map(entry => {
          return Object.assign({}, entry, { Description })
        })
      },
    },
    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Lazily load input items
        axios.get('/api/tags/').then(response => {
            console.log(response.data)
        })
        // fetch('https://api.publicapis.org/entries')
        //   .then(res => res.json())
        //   .then(res => {
        //     const { count, entries } = res
        //     this.count = count
        //     this.entries = entries
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        //   .finally(() => (this.isLoading = false))
     },
    },
}
</script>
<style>

</style>
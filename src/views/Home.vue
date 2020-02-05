<template>
  <div>
    <div class="background-banner elevation-6">
      <add-form v-if="!browse_categories" @browse_categories="changeMode" />
      <categories-browser v-else @show-form="changeMode"/>
    </div>
    <ads-list />
  </div>
</template>

<script>
import AddForm from '@/components/AddForm.vue';
import AdsList from '@/components/AdsList.vue';
import CategoriesBrowser from '@/components/CategoriesBrowser.vue';


export default {
  components: {
    AddForm,
    AdsList,
    CategoriesBrowser,
  },
  data: () => ({
    browse_categories: false,
  }),
  mounted () {
    this.browse_categories = !!(this.$route.params.category_id);
  },
  methods: {
    changeMode() {
      this.browse_categories = !this.browse_categories;
    }
  }
};
</script>

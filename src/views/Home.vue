<template>
  <div>
    <div class="background-banner elevation-6">
      <add-form @browse_categories="changeMode" v-if="!browse_categories"></add-form>
      <categories-browser @show-form="changeMode" v-else></categories-browser>
    </div>
    <ads-list></ads-list>
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
  methods: {
    changeMode() {
      this.browse_categories = !this.browse_categories;
    }
  }
};
</script>

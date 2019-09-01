<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn rounded v-on="on" light icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" @click="">
        <v-list-item-title>
          <v-icon class="mr-3" v-text="item.icon"></v-icon>{{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
export default {
    props: {
        items: {
            type: Array,
            required: false
        }
    }
}
</script>
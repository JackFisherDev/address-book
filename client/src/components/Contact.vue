<template>
  <v-list-tile
    avatar
    @click="showContact"
  >
    <v-list-tile-avatar>
      <img :src="contact.avatar">
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title v-html="contact.name"></v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  props: ['contact']
}
</script>

<style scoped>

</style>

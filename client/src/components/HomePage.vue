<template>
  <div>
    <v-parallax
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      :height="screenHeight"
    >
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-thin mb-3">
          Address book
        </h1>
        <h4 class="subheading">
          Built using Vuetify.js
        </h4>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: 'HomePage',

  data() {
    return {
      screenHeight: 0
    }
  },

  mounted() {
    this.screenHeight = window.innerHeight
  }
}
</script>

<style scoped></style>

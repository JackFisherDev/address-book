<template>
  <v-toolbar
    dark
    fixed
    class="info"
  >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Address Book</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        route
        to="login"
      >
        Login
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        route
        to="register"
      >
        Sign Up
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>

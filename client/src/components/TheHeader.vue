<template>
  <v-toolbar
    dark
    fixed
    class="info"
  >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="mr-3">Address Book</v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        route
        to="/contacts"
      >
        My contacts
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        route
        to="/groups"
      >
        Manage groups
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        @click="logout"
      >
        Log Out
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        route
        to="/login"
      >
        Login
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        route
        to="/register"
      >
        Sign Up
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'HomePage'
      })
    }
  }
}
</script>

<style scoped>

</style>

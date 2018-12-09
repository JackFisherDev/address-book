<template>
  <div id="app">
    <v-app>
      <app-header/>
      <main>
        <v-container
          fluid
          class="pa-0"
        >
          <router-view/>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>

</style>

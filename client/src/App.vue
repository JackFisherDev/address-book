<template>
  <div id="app">
    <v-app>
      <app-header/>
      <main class="pt-3">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
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
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>

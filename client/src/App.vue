<template>
  <div id="app">
    <v-app>
      <app-header/>
      <main class="pt-3">
        <transition
          name="slide"
          mode="out-in"
        >
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
  .slide-enter-active,
  .slide-leave-active {
    transition-duration: 0.5s;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  }

  .slide-enter,
  .slide-leave-active {
    opacity: 0;
    transform: translate(0, 2em);
  }
</style>

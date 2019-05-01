<template>
  <div id="app">
    <v-app>
      <TheHeader />
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
import TheHeader from '@/components/TheHeader'

export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>

<style>
  .slide-enter-active,
  .slide-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  }

  .slide-enter,
  .slide-leave-active {
    opacity: 0;
    transform: translate(0, 2em);
  }

  /* prefix a means animation */
  .a-jump-up:hover i {
    animation: jump-up;
    animation-duration: .35s;
  }

  .a-spin i {
    transition: transform .2s ease-in-out;
  }
  .a-spin:hover i {
    transform: rotate(90deg);
  }

  .a-sway:hover i {
    animation: sway;
    animation-duration: .35s;
  }

  @keyframes jump-up {
    0% {
      transform: translateY(2px);
    }
    60% {
      transform: translateY(-5px);
    }
    80% {
      transform: translateY(-2px);
    }
    100% {
      transform: translateY(0);
    }
  }
  @-webkit-keyframes jump-up {
    0% {
      transform: translateY(2px);
    }
    60% {
      transform: translateY(-5px);
    }
    80% {
      transform: translateY(-2px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes sway {
    0% {
      transform: rotate(-15deg);
    }
    30% {
      transform: rotate(-30deg)
    }
    60% {
      transform: rotate(15px);
    }
    80% {
      transform: rotate(30deg);
    }
    90% {
      transform: rotate(15px)
    }
    100% {
      transform: rotate(0);
    }
  }
  @-webkit-keyframes sway {
    0% {
      transform: rotate(-15deg);
    }
    30% {
      transform: rotate(-30deg)
    }
    60% {
      transform: rotate(15px);
    }
    80% {
      transform: rotate(30deg);
    }
    90% {
      transform: rotate(15px)
    }
    100% {
      transform: rotate(0);
    }
  }
</style>

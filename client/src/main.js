import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from '@/store/store'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueCompositionApi)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  render: (h) => h(App)
})

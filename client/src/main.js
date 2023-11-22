import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store/index.js' // Vuex store
import axios from 'axios'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

axios.defaults.withCredentials = true

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  router,
  store, // Add Vuex store to Vue instance
  render: h => h(App) // function(h) { return h(App); }
}).$mount('#app')

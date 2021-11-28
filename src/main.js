import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueConfirmDialog from "vue-confirm-dialog"

Vue.config.productionTip = false
Vue.use(VueConfirmDialog);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

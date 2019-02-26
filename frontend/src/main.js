import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import './registerServiceWorker'
import moment from 'moment'
import '@/assets/scss/main.scss';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')






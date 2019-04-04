import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import './registerServiceWorker'
import moment from 'moment'
import '@/assets/scss/main.scss';

import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
var SocialSharing = require('vue-social-sharing');


// const SocketInstance = socketio('http://192.168.1.105:8810');
const SocketInstance = socketio('/');


Vue.use(SocialSharing);
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { path: "/socket.io" } //Optional options
}))


Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





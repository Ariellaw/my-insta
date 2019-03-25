import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import './registerServiceWorker'
import moment from 'moment'
import '@/assets/scss/main.scss';

import socketio from 'socket.io-client';
// import SocketIO from 'socket.io';
import VueSocketIO from 'vue-socket.io';

// const SocketInstance = io('192.168.1.105:3003');
const SocketInstance = socketio('http://192.168.43.54:8810');

// const SocketInstance = io('192.168.1.105:3003',  {
//   path: "/",
//   // transports: ['websocket']
// });
// const SocketInstance = SocketIO('192.168.1.105:3003');
// export SocketInstance;

// Vue.use(VueSocketIO, SocketInstance);
// import { MyVuexStore } from './my-vuex-store.js'

Vue.use(new VueSocketIO({
  debug: true,
  // connection: '192.168.1.105:3003',
  connection: SocketInstance,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  options: { path: "/" } //Optional options
}))


Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')





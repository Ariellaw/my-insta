import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import userModule from './userModule.js'
import imageModule from './imageModule.js'
// import websockets from './webSockets'
const myStore = new Vuex.Store({
    strict: true,
    modules: {
        userModule,
        imageModule,
        // websockets
    }
})

export default myStore;
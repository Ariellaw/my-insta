import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import userModule from './userModule.js'
import imageModule from './imageModule.js'

const myStore = new Vuex.Store({
    strict: true,
    modules: {
        userModule,
        imageModule
    }
})

export default myStore;
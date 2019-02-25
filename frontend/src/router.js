import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import userProfile from './views/Profile.vue'
import editUserDetails from './views/EditUserDetails.vue'
import Authentication from './views/Authentication.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user/:userId',
      name: 'user-profile',
      component: userProfile
    },
    {
      path: '/edit/:userId',
      name: 'edit-user-details',
      component: editUserDetails
    },
    {
     path:'/authentication',
     name: 'authentication',
     component:Authentication
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

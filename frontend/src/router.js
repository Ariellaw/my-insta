import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import userProfile from './views/Profile.vue'
import editUserDetails from './views/EditUserDetails.vue'
import Authentication from './views/Authentication.vue'
import SearchResults from './views/searchResults.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:image?',
      name: 'home',
      component: Home
    },
    {
      path: '/user/:userName/:image?',
      name: 'user-profile',
      component: userProfile
    },
    {
      path: '/edit/:userName',
      name: 'edit-user-details',
      component: editUserDetails
    },
    {
     path:'/login',
     name: 'authentication',
     component:Authentication
    },
    {
      path:'/search/:type/:keyword/:image?',
      name:'searh-results-page',
      component:SearchResults
    },
    {
      path:'/register',
      name:'register',
      component:Register
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

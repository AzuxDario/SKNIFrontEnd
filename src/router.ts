import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

//It's here for now because after refreshing F5
//browser doesn't see vuetify for some reason
//move it for to better place 
import Vuetify from 'vuetify';
Vue.use(Vuetify, {
  iconfont: 'md',
});


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/articles/:page?',
      name: 'articles',
      component: () => import('./views/Articles.vue'),
    },
    {
      path: '/article/:id-:alias',
      name: 'article',
      component: () => import('./views/Article.vue'),
    },
    {
      path: '/tag/:tag/:page?',
      name: 'tag',
      component: () => import('./views/Tag.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
    },
    {
      path: '/sections',
      name: 'sections',
      // route level code-splitting
      // this generates a separate chunk (sections.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "sections" */ './views/Sections.vue'),
    },
    {
      path: '/hardware/:page?',
      name: 'hardware',
      // route level code-splitting
      // this generates a separate chunk (hardware.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "hardware" */ './views/Hardware.vue'),
    },
    {
      path: '/profiles/:page?',
      name: 'profiles',
      component: () => import(/* webpackChunkName: "profiles" */ './views/Profiles.vue'),
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
    },
    {
      path: '/projects/:page?',
      name: 'projects',
      component: () => import(/* webpackChunkName: "projects" */ './views/Projects.vue'),
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import(/* webpackChunkName: "project" */ './views/Project.vue'),
    },
  ],
});

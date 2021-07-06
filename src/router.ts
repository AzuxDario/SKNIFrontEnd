import Vue from 'vue';
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from 'vue-router';
import store from './store';

Vue.use(VueRouter);

const authGuard = (to: Route, from: Route, next: NavigationGuardNext) => {
  if (!store.getters.isAdministrator) {
    next({ name: 'error403' });
  } else {
    next();
  }
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "About" */ './views/About.vue'),
  },
  {
    path: '/articles/:page?',
    name: 'articles',
    component: () =>
      import(/* webpackChunkName: "Article" */ './views/ArticleList.vue'),
  },
  {
    path: '/article/:id-:alias',
    name: 'article',
    component: () =>
      import(/* webpackChunkName: "ArticlePage" */ './views/Article.vue'),
  },
  {
    path: '/article/edit/:id?',
    name: 'articleEdit',
    component: () =>
      import(/* webpackChunkName: "ArticleEdit" */ './views/ArticleEdit.vue'),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      if (store.getters.isAuthenticated) {
        
        if (store.getters.user.permissions['RESTApi.change_article']) {
          next();
        }
        else {
          next({ name: 'error403' });
        }
      }
      else {
        next({ name: 'error403' });
      }
    }
  },
  {
    path: '/article/add',
    name: 'articleAdd',
    component: () =>
      import(/* webpackChunkName: "ArticleEdit" */ './views/ArticleEdit.vue'),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      if (store.getters.isAuthenticated) {
        if (store.getters.user.permissions['RESTApi.add_article']) {
          next();
        }
        else {
          next({ name: 'error403' });
        }
      }
      else {
        next({ name: 'error403' });
      }
    }
  },
  {
    path: '/tag/:tag/:page?',
    name: 'tag',
    component: () =>
      import(/* webpackChunkName: "Article" */ './views/Tag.vue'),
  },
  {
    path: '/sections',
    name: 'sections',
    component: () =>
      import(/* webpackChunkName: "Sections" */ './views/SectionList.vue'),
  },
  {
    path: '/section/:id',
    name: 'section',
    component: () =>
      import(/* webpackChunkName: "Section" */ './views/Section.vue'),
  },
  {
    path: '/section/edit/:id?',
    name: 'sectionEdit',
    component: () =>
      import(/* webpackChunkName: "SectionEdit" */ './views/SectionEdit.vue'),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      if (store.getters.isAuthenticated) {
        if (store.getters.user.permissions['RESTApi.change_section']) {
          next();
        }
        else {
          next({ name: 'error403' });
        }
      }
      else {
        next({ name: 'error403' });
      }
    }
  },
  {
    path: '/section/add',
    name: 'sectionAdd',
    component: () =>
      import(/* webpackChunkName: "SectionEdit" */ './views/SectionEdit.vue'),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      if (store.getters.isAuthenticated) {
        if (store.getters.user.permissions['RESTApi.add_section']) {
          next();
        }
        else {
          next({ name: 'error403' });
        }
      }
      else {
        next({ name: 'error403' });
      }
    }
  },
  {
    path: '/hardware/edit/:id?',
    name: 'hardwareEdit',
    component: () =>
      import(/* webpackChunkName: "HardwareEdit" */ './views/HardwareEdit.vue'),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      if (store.getters.isAuthenticated) {
        if (store.getters.user.permissions['RESTApi.change_hardware']) {
          next();
        }
        else {
          next({ name: 'error403' });
        }
      }
      else {
        next({ name: 'error403' });
      }
    }
  },
  {
    path: '/hardware/add',
    name: 'hardwareAdd',
    component: () =>
      import(/* webpackChunkName: "HardwareEdit" */ './views/HardwareEdit.vue'),
    beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
      if (store.getters.isAuthenticated) {
        if (store.getters.user.permissions['RESTApi.add_hardware']) {
          next();
        }
        else {
          next({ name: 'error403' });
        }
      }
      else {
        next({ name: 'error403' });
      }
    }
  },
  {
    path: '/hardware/:page?',
    name: 'hardwareList',
    component: () =>
      import(/* webpackChunkName: "Hardware" */ './views/HardwareList.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/hardwareCard/:id?',
    name: 'hardware',
    component: () =>
      import(/* webpackChunkName: "Hardware" */ './views/Hardware.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "User" */ './views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "UserRegister" */ './views/Register.vue'),
  },
  {
    path: '/user/panel',
    name: 'userPanel',
    component: () =>
      import(/* webpackChunkName: "UserPanel" */ './views/UserPanel.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/admin/panel/:module?',
    name: 'adminPanel',
    component: () =>
      import(/* webpackChunkName: "AdminPanel" */ './views/AdminPanel.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/user/passchange',
    name: 'UserPassChange',
    component: () =>
      import(
        /* webpackChunkName: "UserPassChange" */ './views/UserPassChange.vue'
      ),
    beforeEnter: authGuard,
  },
  {
    path: '/user/descriptionchange',
    name: 'UserEditChange',
    component: () =>
      import(/* webpackChunkName: "UserEdit" */ './views/UserEdit.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/user/profile/:id',
    name: 'userProfile',
    component: () =>
      import(/* webpackChunkName: "UserProfile" */ './views/UserProfile.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/projects/:page?',
    name: 'projects',
    component: () =>
      import(/* webpackChunkName: "Project" */ './views/ProjectList.vue'),
  },
  {
    path: '/project/edit/:id?',
    name: 'editProject',
    component: () =>
      import(/* webpackChunkName: "ProjectEdit" */ './views/ProjectEdit.vue'),
      beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
        if (store.getters.isAuthenticated) {
          if (store.getters.user.permissions['RESTApi.change_project']) {
            next();
          }
          else {
            next({ name: 'error403' });
          }
        }
        else {
          next({ name: 'error403' });
        }
      }
  },
  {
    path: '/project/add',
    name: 'addProject',
    component: () =>
      import(/* webpackChunkName: "ProjectEdit" */ './views/ProjectEdit.vue'),
      beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
        if (store.getters.isAuthenticated) {
          if (store.getters.user.permissions['RESTApi.add_project']) {
            next();
          }
          else {
            next({ name: 'error403' });
          }
        }
        else {
          next({ name: 'error403' });
        }
      }
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () =>
      import(/* webpackChunkName: "ProjectPage" */ './views/Project.vue'),
  },
  {
    path: '/403',
    name: 'error403',
    component: () =>
      import(/* webpackChunkName: "Eror403" */ './views/403.vue'),
  },
  {
    path: '/404',
    name: 'error404',
    component: () =>
      import(/* webpackChunkName: "Error404" */ './views/404.vue'),
  },
  { path: '*', redirect: '/404' },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;

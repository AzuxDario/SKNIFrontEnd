import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import VueMarkdown from 'vue-markdown';
import VueMoment from 'vue-moment';
import ArticlesList from '@/components/ArticlesList.vue';
import CommentsList from '@/components/CommentsList.vue';
import SingleArticle from '@/components/SingleArticle.vue';
import SectionsList from '@/components/SectionsList.vue';
import HardwaresList from '@/components/HardwaresList.vue';
import SingleProfile from '@/components/SingleProfile.vue';
import ProfilesList from '@/components/ProfilesList.vue';
import ProjectsList from '@/components/ProjectsList.vue';
import SingleProject from '@/components/SingleProject.vue';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(Vuetify, {
  iconfont: 'md',
});

Vue.use(VueMoment, 'vue-moment');

Vue.component('vue-markdown', VueMarkdown);
Vue.component('articles-list', ArticlesList);
Vue.component('comments-list', CommentsList);
Vue.component('single-article', SingleArticle);
Vue.component('sections-list', SectionsList);
Vue.component('hardwares-list', HardwaresList);
Vue.component('single-profile', SingleProfile);
Vue.component('profiles-list', ProfilesList);
Vue.component('projects-list', ProjectsList);
Vue.component('single-project', SingleProject);

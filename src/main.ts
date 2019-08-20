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
import HomeSectionList from '@/components/homePageComponents/HomeSectionList.vue';
import HomeArticleList from '@/components/homePageComponents/HomeArticleList.vue';
import ArticleCard from '@/components/ArticleCard.vue';
import Footer from '@/components/Footer.vue';
// @ts-ignore
import VueGallery from 'vue-gallery';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(Vuetify, {
  iconfont: 'mdi',
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
// Vue.component('home-section-list', HomeSectionList);
// Vue.component('home-article-list', HomeArticleList);
Vue.component('article-card', ArticleCard);
// Vue.component('footer-main', Footer);
Vue.component('vue-gallery', VueGallery);

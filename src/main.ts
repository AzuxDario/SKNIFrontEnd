import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import SectionsList from '@/components/SectionsList.vue'

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(Vuetify, {
  iconfont: 'md'
});

Vue.component('sections-list', SectionsList);

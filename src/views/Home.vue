<template>
  <div class='home'>
    <v-card>
      <v-img :src="require('../assets/strona_bg.png')" class="hidden-sm-and-down" :asspect-ratio="3.55"></v-img>
    </v-card>
    <div class="hidden-md-and-up background">
      <v-img :src="require('../assets/logo_color.png')"></v-img>
    </div>
    <HomeSectionList v-bind:sections="sections"></HomeSectionList>
    <HomeArticleList :articles="articles"></HomeArticleList>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';
import {ArticleModel} from '../models/ArticleModel';
import {ArticlesService} from '../services/ArticlesService';
import HomeArticleList from '../components/homePageComponents/HomeArticleList.vue';
import HomeSectionList from '../components/homePageComponents/HomeSectionList.vue';
@Component({
    components: {
        HomeArticleList, HomeSectionList,
    },
})
export default class Home extends Vue {
    private sectionsService!: SectionsService;
    private articleService!: ArticlesService;
    private sections!: SectionModel[];
    private articles!: ArticleModel[];
    constructor() {
        super();
        this.sectionsService = new SectionsService();
        this.articleService = new ArticlesService();
        this.sections = [];
        this.articles = [];
    }
    public mounted() {
        this.sectionsService.getAllSections().then((p) => {
            this.sections = p;
            for (let i = 0; i < this.sections.length; ) {
                if (this.sections[i].isVisible === false) {
                    this.sections.splice(i, 1);
                } else {
                    i++;
                }
            }
        });

        this.articleService.getArticles(0, 3, false).then((a) => {
            this.articles = a.results;
        });
    }
}
</script>

<style scoped>
  .background {
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 70% , rgba(255, 255, 255, 1) 100%), url("../assets/bg.png") repeat;
    background-position: center top;
  }
</style>

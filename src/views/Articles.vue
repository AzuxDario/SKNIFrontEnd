<template>
  <div>
    <articles-list v-bind:articles='articles' style="margin-left: 5px; margin-right: 5px"></articles-list>
    <v-pagination
      v-model='pagination.currentPage'
      :length='pagination.pageCount'
      @input='paginationClicked'
      :prev-icon='"mdi-chevron-left"'
      :next-icon='"mdi-chevron-right"'
    ></v-pagination>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import ArticlesList from '@/components/ArticlesList.vue';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

@Component
export default class Articles extends Vue {
  private articlesService!: ArticlesService;
  private pagination!: PaginationModel;
  private articles!: ArticleModel[];

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  private mounted() {
    let pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber)) {
      pageNumber = 1;
    }

    this.pagination.currentPage = pageNumber;
    this.paginationClicked(pageNumber);
  }

  private paginationClicked(pageNumber: number) {
    this.articlesService
      .getArticles(pageNumber, this.pagination.itemsPerPage, false)
      .then((paginationContainer: PaginationContainer<ArticleModel>) => {
        this.articles = paginationContainer.results;
        this.pagination.itemCount = paginationContainer.count;
      });

    this.$router.replace({
      name: 'articles',
      params: { page: '' + pageNumber },
    });
  }

  private data() {
    return {
      articles: this.articles,
      pagination: this.pagination,
    };
  }
}
</script>

<style>
.v-pagination .primary {
  background-color: rgb(65, 65, 255) !important;
}
  .v-pagination{
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>

<template>
  <div>
    <v-row justify="center">
      <v-col mx="12" sm="10" md="8" lg="6" xl="4">
        <v-row
          align="center"
          justify="center"
          class="ma-2"
          v-if="articles && articles.length > 0"
        >
          <v-col cols="12" class="pa-0">
            <article-card
              class="my-2"
              v-for="article in articles"
              :key="article.title"
              :article="article"
              @delete="deleteArticle"
            ></article-card>
          </v-col>
        </v-row>
        <v-row align="center" class="fill-height" v-else>
          <v-col>
            <div class="text-h3 font-weight-bold text-center">
              {{ loading ? 'Ładowanie danych' : 'Brak artykułów' }}
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="loading"
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>
        <v-pagination
          v-model="pagination.currentPage"
          class="mt-2"
          :length="pagination.pageCount"
          @input="paginationClicked"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
          v-if="articles && articles.length > 0"
        ></v-pagination>
      </v-col>
    </v-row>
    <v-btn-cap
      fab
      fixed
      bottom
      right
      v-if="role"
      :to="{ name: 'articleAdd' }"
      class="success"
    >
      <v-icon class="white--text">mdi-plus</v-icon>
    </v-btn-cap>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';
import { PaginationContainer } from '@/models/PaginationContainer';

@Component
export default class ArticleList extends Vue {
  private articlesService!: ArticlesService;
  private pagination!: PaginationModel;
  private articles!: ArticleModel[];
  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get role(): boolean {
    if (this.auth) {
      return this.$store.getters.user.permissions['RESTApi.add_article'];
    }
    else{
      return false
    }
  }

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.pagination = new PaginationModel(1, 3, 3);
  }

  private mounted() {
    this.getArticles();
  }

  private paginationClicked(pageNumber: number) {
    this.$router.replace({
      name: 'articles',
      params: { page: '' + pageNumber },
    });
    this.getArticles();
  }

  private getArticles() {
    const pageNumber = +this.$route.params.page;
    if (pageNumber === undefined || isNaN(pageNumber) || pageNumber < 1) {
      this.paginationClicked(1);
      return;
    }

    this.pagination.currentPage = pageNumber;
    this.articlesService
      .getArticles(pageNumber, this.pagination.itemsPerPage, false)
      .then((paginationContainer: PaginationContainer<ArticleModel>) => {
        this.articles = paginationContainer.results;
        if (!this.articles.length && pageNumber !== 1) {
          this.paginationClicked(1);
          return;
        }
        this.pagination.itemCount = paginationContainer.count;
        this.$data.loading = false;
      })
      .catch(() => {
        this.$data.loading = false;
      });
  }

  private deleteArticle(id: number) {
    this.articlesService
      .deleteArticle(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('successMessage', 'Artykuł został usunięty');
          this.$router.replace({
            name: 'articles',
            params: { page: 'reload' },
          });
        }
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania artykułu!');
      });
  }

  private data() {
    return {
      articles: this.articles,
      pagination: this.pagination,
      loading: true,
    };
  }
}
</script>

<template>
  <div class="mt-2">
    <v-row justify="center" v-if="article != undefined" class="mx-1">
      <v-col cols="12" sm="10" md="8" lg="6" xl="4">
        <v-card>
          <v-card-title
            class="text-h4 primary--text font-weight-bold justify-center"
            style="word-break: break-word"
            >{{ article.title }}
          </v-card-title>
          <v-divider />
          <v-card-text class="grey lighten-3">
            <v-row align="center" justify="center">
              <v-col cols="auto" class="mx-2 py-1">
                <v-row align="center" justify="center" class="my-auto">
                  <v-icon left color="primary">mdi-calendar-today</v-icon>
                  <p class="my-auto">
                    {{ article.creation_date | moment('DD-MM-YYYY') }}
                  </p>
                </v-row>
              </v-col>
              <v-col cols="auto" class="mx-2 py-1">
                <v-row align-content="center" justify="center" class="my-auto">
                  <v-icon left color="primary">mdi-account</v-icon>
                  <p class="my-auto">{{ article.creator.username }}</p>
                </v-row>
              </v-col>
              <v-col cols="auto" class="mx-2 py-1">
                {{ article.tags.length === 1 ? 'Tag:' : 'Tagi:' }}
                <a
                  :href="'/#/tag/' + tag.name"
                  class="text-decoration-none"
                  v-for="(tag, i) in article.tags"
                  :key="i"
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-chip
                      small
                      label
                      class="white--text mx-1"
                      style="cursor: pointer"
                      :color="hover ? 'primary' : 'grey'"
                    >
                      <v-icon small left>mdi-tag-outline</v-icon>
                      {{ tag.name }}
                    </v-chip>
                  </v-hover>
                </a>
              </v-col>
              <v-col cols="auto" class="mx-2 py-1">
                {{ article.authors.length === 1 ? 'Autor:' : 'Autorzy:' }}
                <a
                  :href="'/#/user/profile/' + author.id"
                  class="text-decoration-none"
                  v-for="(author, i) in article.authors"
                  :key="i"
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-chip
                      small
                      label
                      class="white--text mx-1"
                      style="cursor: pointer"
                      :color="hover ? 'primary' : 'grey'"
                    >
                      <v-icon small left>mdi-account</v-icon>
                      {{ author.username }}
                    </v-chip>
                  </v-hover>
                </a>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-text>
            <markdown-it-vue
              class="md-body text-left"
              :content="article.text"
              :options="markdownOptions"
            />
          </v-card-text>
        </v-card>
        <gallery breakpoints="xs6" :imgs="article.gallery" />
        <comments-list :comments="comments" />
      </v-col>
    </v-row>
    <v-speed-dial fixed right bottom direction="top" v-model="fab" v-if="role">
      <template v-slot:activator>
        <v-btn-cap
          fab
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn-cap>
      </template>
      <v-btn-cap
        fab
        color="orange"
        :to="{ name: 'articleEdit', params: { id: $route.params.id } }"
      >
        <v-icon>mdi-pen</v-icon>
      </v-btn-cap>
      <v-btn-cap fab color="error" @click="dialog = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn-cap>
    </v-speed-dial>
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteArticle($route.params.id)"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { ArticleModel } from '@/models/ArticleModel';

@Component
export default class Article extends Vue {
  private articlesService!: ArticlesService;
  private article!: ArticleModel;

  private beforeCreate() {
    this.articlesService = new ArticlesService();
  }

  private mounted() {
    this.articlesService
      .getArticle(+this.$route.params.id)
      .then((article) => {
        this.article = article;
      })
      .catch(() => {
        this.$router.replace({ name: 'error404' });
      });

    this.$store.dispatch('getComments', this.$route.params.id);
  }

  private beforeDestroy() {
    this.$store.dispatch('purgeComments');
  }

  get auth(): boolean {
    return this.$store.getters.isAuthenticated;
  }

  get role(): boolean {
    if (this.auth) {
      return this.$store.getters.user.permissions['RESTApi.change_article'];
    }
    else{
      return false
    }
  }

  get dialogText() {
    return 'Czy na pewno chcesz usunąć artykuł "' + this.article.title + '"?';
  }

  private deleteArticle(id: number) {
    this.articlesService
      .deleteArticle(id)
      .then((res) => {
        if (res.status === 204) {
          this.$store.dispatch('successMessage', 'Artykuł został usunięty');
          this.$router.replace({ name: 'articles', params: { page: '1' } });
        }
      })
      .catch(() => {
        this.$store.dispatch('errorMessage', 'Błąd poczas usuwania artykułu!');
      });
  }

  get comments() {
    return this.$store.getters.comments;
  }

  private data() {
    return {
      article: this.article,
      fab: false,
      dialog: false,
      markdownOptions: {
        markdownIt: {
          html: true,
          linkify: true,
        },
        githubToc: {
          anchorLink: false,
        },
      },
    };
  }
}
</script>

<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <single-article v-bind:article='article' v-bind:comments='comments'></single-article>
    </v-flex>
  </v-layout>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import { ArticlesService } from '@/services/ArticlesService';
import { CommentsService } from '@/services/CommentsService';
import { ArticleModel } from '@/models/ArticleModel';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class Article extends Vue {
  private articlesService!: ArticlesService;
  private commentsService!: CommentsService;
  private article!: ArticleModel;
  private comments!: CommentModel[];

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.commentsService = new CommentsService();
  }

  private mounted() {
    this.articlesService.getArticle(+this.$route.params.id).then((article) => {
      this.article = article;

      this.$router.replace({
        name: 'article',
        params: { alias: article.alias },
      });
    });

    this.commentsService
      .getCommentsForArticle(+this.$route.params.id)
      .then((comments) => {
        this.comments = comments;
      });
  }

  private data() {
    return {
      article: this.article,
      comments: this.comments,
    };
  }
}
</script>

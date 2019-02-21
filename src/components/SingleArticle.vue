<template>
  <div v-if="article != undefined">
    <p>Dane artykułu {{$route.params.id}}</p>
    <p>Tytuł: {{ article.title }}</p>
    <p>Autor: {{article.creator.user.username}}, Data: {{article.creation_date | moment("DD-MM-YYYY")}} o godzinie {{article.creation_date | moment("HH:mm:SS")}}</p>
    <p>
      Tagi:
      <span v-for="articleTag in article.tags" :key="articleTag.tag.name">
        #
        <a v-bind:href="'/#/tag/'+ articleTag.tag.name">{{ articleTag.tag.name }}</a>
      </span>
    </p>
    <p>Treść:
      <vue-markdown>{{article.text}}</vue-markdown>
    </p>

    <comments-list v-bind:comments="comments"></comments-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ArticleModel } from "@/models/ArticleModel";
import { CommentModel } from "@/models/CommentModel";

@Component
export default class SingleArticle extends Vue {
  @Prop() article!: ArticleModel;
  @Prop() comments!: CommentModel[];
}
</script>
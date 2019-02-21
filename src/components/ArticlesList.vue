<template>
  <div>
    <div v-for="article in articles" :key="article.title" style="border: 1px solid gray">
      <p>
        Tytuł:
        <a v-bind:href="'/#/article/'+ article.id + '-' + article.alias">{{ article.title }}</a>
      </p>
      <p>Autor: {{article.creator.user.username}}, Data: {{article.creation_date | moment("DD-MM-YYYY")}} o godzinie {{article.creation_date | moment("HH:mm:SS")}} </p>
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
      <p>Liczba komentarzy: {{article.comments_number}}</p>
      <p v-if="article.readMore">
        <a v-bind:href="'/#/article/'+ article.id + '-' + article.alias">Czytaj więcej...</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ArticleModel } from "@/models/ArticleModel";
import { PaginationModel } from "@/models/PaginationModel";

@Component
export default class ArticlesList extends Vue {
  @Prop() articles!: ArticleModel[];
}
</script>
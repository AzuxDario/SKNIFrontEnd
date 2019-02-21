<template>
    <div v-if='article != undefined'>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class='headline mb-0 text-xs-left'>
              <a v-bind:href="'/#/article/'+ article.id + '-' + article.alias">{{ article.title }}</a>
            </h3>
            <div class='text-xs-left'>
              <v-icon>person</v-icon>{{article.creator.user.username}}
              <v-icon>calendar_today</v-icon>{{article.creation_date | moment('DD-MM-YYYY')}}
              <span v-if='article.tags.length != 0'>
                <v-icon>note</v-icon>
                <span v-for='(articleTag, index) in article.tags' :key='articleTag.tag.name'>
                  <a v-bind:href="'/#/tag/'+ articleTag.tag.name">{{ '#' + articleTag.tag.name }}</a>
                  <span v-if='index != (article.tags.length - 1)'>, </span>
                </span>
              </span>
              <v-icon>comment</v-icon>{{article.comments_number}}
            </div>
            <vue-markdown class='text-xs-left' style='margin-top: 10px;'>{{article.text}}</vue-markdown>
          </div>
        </v-card-title>
        <v-card-actions v-if='article.readMore' style='margin-top: -20px;'>
          <v-btn v-bind:href="'/#/article/'+ article.id + '-' + article.alias" flat color='orange'>Czytaj więcej...</v-btn>
        </v-card-actions>
      </v-card>

      <comments-list v-bind:comments='comments'></comments-list>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ArticleModel } from '@/models/ArticleModel';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class SingleArticle extends Vue {
  @Prop() public article!: ArticleModel;
  @Prop() public comments!: CommentModel[];
}
</script>
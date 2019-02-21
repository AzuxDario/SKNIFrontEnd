<template>
  <div>
    <v-container grid-list-md text-xs-centxer>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field label='Tytuł artykułu' v-model='article.title'></v-text-field>
        </v-flex>
        <v-flex xs10>
          <v-text-field label='Alias' v-model='article.alias'></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='generateAlias'>Wygeneruj alias</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            label='Data utworzenia'
            v-model='formattedCreationDate'
            mask='##-##-#### ##:##:##'
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            label='Data publikacji'
            v-model='formattedPublicationDate'
            mask='##-##-#### ##:##:##'
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select
            v-model='selectedTags'
            :items='allTags'
            :item-text='tagTextSelector'
            attach
            chips
            label='Tags'
            multiple
          ></v-select>
        </v-flex>
        <v-flex xs6 class='text-xs-left full-height'>
          <v-textarea
            id='content-textarea'
            v-model='article.text'
            v-scroll:#content-textarea='onScroll'
          ></v-textarea>
        </v-flex>
        <v-flex xs6 class='text-xs-left'>
          <vue-markdown id='content-preview' :source='article.text' html></vue-markdown>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ArticlesService } from '@/services/ArticlesService';
import { TagsService } from '@/services/TagsService';
import { ArticleModel } from '@/models/ArticleModel';
import { TagModel } from '@/models/TagModel';
import moment from 'moment';

@Component
export default class EditArticle extends Vue {
  private articlesService!: ArticlesService;
  private tagsService!: TagsService;
  private article!: ArticleModel;
  private allTags!: TagModel[];
  private selectedTags!: string[];
  private formattedCreationDate!: string;
  private formattedPublicationDate!: string;

  private beforeCreate() {
    this.articlesService = new ArticlesService();
    this.tagsService = new TagsService();
    this.article = new ArticleModel();
    this.formattedCreationDate = '';
    this.formattedPublicationDate = '';
  }

  private mounted() {
    if (this.$route.params.id !== undefined) {
      this.articlesService.getArticle(+this.$route.params.id).then((article) => {
        this.article = article;
        this.selectedTags = this.article.tags.map((p) => p.tag.name);

        this.formattedCreationDate = moment(this.article.creation_date).format(
          'DD-MM-YYYY HH:mm:SS',
        );

        this.formattedPublicationDate = moment(
          this.article.publication_date,
        ).format('DD-MM-YYYY HH:mm:SS');

        this.tagsService.getAllTags().then((tags) => {
          this.allTags = tags;
        });
      });
    }
  }

  private generateAlias() {
    this.article.alias = this.articlesService.generateAliasForTitle(
      this.article.title,
    );
    this.$forceUpdate();
  }

  private data() {
    return {
      article: this.article,
      allTags: this.allTags,
      selectedTags: this.selectedTags,
      formattedPublicationDate: this.formattedPublicationDate,
      formattedCreationDate: this.formattedCreationDate,
    };
  }

  private tagTextSelector(item: TagModel) {
    return item.name;
  }

  private onScroll(offset: any) {
    const contentPreview = this.$el.querySelector('#content-preview');
    if (contentPreview !== undefined && contentPreview !== null) {
      contentPreview.scrollTop = offset.target.scrollTop;
    }
  }
}
</script>

<style scope>
#content-textarea {
  padding-top: 0;
  overflow: auto;
  height: 500px;
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  line-height: 18.5714px;
  font-size: 13px;
  padding-top: 0;
  resize: none;
  margin-top: -17px;
}

#content-preview {
  overflow: auto;
  height: 500px;
  line-height: 22px;
  resize: none;
}
</style>
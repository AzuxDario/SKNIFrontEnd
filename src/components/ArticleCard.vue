<template>
  <div>
    <v-card v-if="article != undefined">
      <v-img
        class="white--text"
        height="300px"
        :src="
          article.gallery
            ? article.gallery[0]
              ? be + article.gallery[0].image
              : require('../assets/strona_bg.png')
            : require('../assets/strona_bg.png')
        "
      >
        <v-row align="end" style="height: 100%" class="card-text ma-0">
          <v-col cols="12">
            <v-card-title
              class="
                text-h5
                white--text
                darken-2
                font-weight-bold
                justify-left
                pb-0
                px-0
              "
              >{{ article.title }}</v-card-title
            >
            <v-card-text class="px-0">
              <p class="text-left mb-0">{{ text }}</p>
            </v-card-text>
            <v-card-actions class="pa-0">
              <v-spacer />
              <v-btn-cap
                :to="{
                  name: 'article',
                  params: { id: article.id, alias: article.alias },
                }"
                color="primary"
              >
                <v-icon left>mdi-page-next</v-icon>
                <span>Czytaj więcej...</span>
              </v-btn-cap>
              <v-speed-dial
                direction="top"
                v-if="role"
                v-model="fab"
                class="ml-2"
              >
                <template v-slot:activator>
                  <v-btn-cap
                    x-small
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
                  x-small
                  color="orange"
                  :to="{ name: 'articleEdit', params: { id: article.id } }"
                >
                  <v-icon>mdi-pen</v-icon>
                </v-btn-cap>
                <v-btn-cap fab x-small color="error" @click="dialog = true">
                  <v-icon>mdi-delete</v-icon>
                </v-btn-cap>
              </v-speed-dial>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
    <confirmation-dialog
      v-if="dialog"
      @yes="deleteArticle"
      @no="dialog = false"
      :text="dialogText"
    ></confirmation-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ArticleModel } from '@/models/ArticleModel';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class ArticleCard extends Vue {
  @Prop() public article!: ArticleModel;
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

  private removeMarkdown(text: string) {
    const removeMd = require('remove-markdown');
    return removeMd(text);
  }

  get dialogText() {
    return 'Czy na pewno chcesz usunąć artykuł "' + this.article.title + '"?';
  }

  get text(): string {
    return this.removeMarkdown(this.article.text);
  }

  get be() {
    return process.env.VUE_APP_BACK_URL;
  }

  private deleteArticle() {
    this.$data.dialog = false;
    this.$emit('delete', this.article.id);
  }

  private data() {
    return {
      fab: false,
      dialog: false,
    };
  }
}
</script>

<style scoped>
.card-text {
  background-image: linear-gradient(rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.8));
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>

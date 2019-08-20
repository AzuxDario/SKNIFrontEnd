<template>
    <div v-if='article != undefined' class="page-container">
      <v-card class="article-background">
        <!--<v-card-title primary-title>-->
          <div class="article">
            <h3 class='headline mb-0 text-xs-left'>
              <a v-bind:href="'/#/article/'+ article.id + '-' + article.alias">{{ article.title }}</a>
            </h3>
            <div class='text-xs-left info'>
              <div><v-icon class='icon'>mdi-calendar-today</v-icon><p>{{article.creation_date | moment('DD-MM-YYYY')}}</p></div>
              <div><v-icon class='icon'>mdi-account</v-icon><p>{{article.creator.user.username}}</p></div>
              <div><span class='tags hidden-sm-and-down' v-if='article.tags.length != 0'>
                <v-icon class='icon'>mdi-note</v-icon>
                <p><span v-for='(articleTag, index) in article.tags' :key='articleTag.tag.name'>
                  <a v-bind:href="'/#/tag/'+ articleTag.tag.name">{{ '#' + articleTag.tag.name }}</a>
                  <span v-if='index != (article.tags.length - 1)'>, </span>
                </span></p>
              </span></div>
            </div>
            <vue-markdown class='text-xs-left description' style='margin-top: 10px;'>{{article.text}}</vue-markdown>
          </div>
        </v-img>
      </v-card>
        <vue-gallery :images="gallery" :index="galleryIndex" @close="galleryIndex = null"></vue-gallery>
      <div class="flex-container">
        <div
                class="image"
                v-for="(image, imageIndex) in article.gallery"
                :key="imageIndex"
                @click="galleryIndex = imageIndex, gallery = getImageUrls()"
                :style="{ backgroundImage: 'url(' + image.image + ')', width: '300px', height: '200px'}"
        ></div>
      </div>
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
  // @Prop() public galleryIndex: number | null = null;
    public data() {
        return {
            galleryIndex: null,
            gallery: [],
        };
    }

    public methods() {
        return {
            getImageUrls: this.getImageUrls,
        };
    }

    public getImageUrls() {
        const imageUrls: string[] = [];
        for (const galleryItem of this.article.gallery) {
            imageUrls.push(galleryItem.image);
        }
        return imageUrls;
    }
}
</script>

<style lang="scss" scoped>
    .page-container{
        margin-top: 20px;
    }
.article{
  width: 90%;
  margin: auto;
  h3{
    display: flex;
    justify-content: center;
    a{
      color: #418F9F;
      text-decoration: none;
      font-size: 35px;
      text-align: center;
      text-shadow: 1.1px 1.1px #65929b;
    }
    padding: 0 0 20px 0;
  }
  .info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgba(0,0,0,0)!important;
    div{
      display: flex;
      flex-direction: row;
      margin-right: 5px;
      span{
        a{
          color:#455154;
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 1px;
        }
      }
      p{
        padding: 20px 0 0 10px;
        letter-spacing: 1px;
        color: #455154;
        font-weight: 500;
      }
      .tags{
        display: flex;
      }
    }
    .icon{
      color: #3f849a;
    }
  }
  .description{
    font-size: 16px;
  }
}
.article-background{
    padding: 20px;
}
.article-background:hover{
  background-color:#f9f9f9;
}
    .image {
        float: left;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border: 1px solid #ebebeb;
        margin: 5px;
        transition: all .2s ease-in-out;
    }

  .image:hover {
    transform: scale(1.1);
  }
  .flex-container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>

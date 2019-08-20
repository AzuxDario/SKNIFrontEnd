<template>
    <div v-if='article != undefined'>
        <v-card>
            <v-img
                    class="white--text"
                    height="300px"
                    :src="article.gallery ? (article.gallery[0] ? article.gallery[0].image : require('../assets/strona_bg_bez_logo.png')) : require('../assets/strona_bg_bez_logo.png')"
            >
                <div style="height: 100%; width: 100%; display: flex; flex-direction: column">
                    <v-container style="flex: 1 100%">
                        <v-layout fill-height>
                        </v-layout>
                    </v-container>

                    <v-container style="background-image: linear-gradient(rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.8)); flex: 1 100%; width: 100%">
                        <v-flex style="text-align: left;">
                            <span class="headline text-xs-left"><a v-bind:href="'/#/article/'+ article.id + '-' + article.alias">{{ article.title }}</a></span>
                            <vue-markdown class='text-xs-left text-shadow-paragraph' style='margin-top: 10px;'>{{article.text}}</vue-markdown>
                            <div style="display: flex; width: 100%; justify-content: space-between;">
                                <v-btn v-bind:href="'/#/article/'+ article.id + '-' + article.alias" flat style="background-color: #64b5f6; color: white; margin-left: auto" class="elevation-2">Czytaj więcej...</v-btn>
                            </div>
                        </v-flex>
                    </v-container>
                </div>
            </v-img>
        </v-card>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { ArticleModel } from '@/models/ArticleModel';
    import { CommentModel } from '@/models/CommentModel';

    @Component
    export default class ArticleCard extends Vue {
        @Prop() public article!: ArticleModel;
    }
</script>

<style scoped>
    a{
        color: white;
        text-decoration: none;
        text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
    }
    a:link{
        color: white;
        text-decoration: none;
    }
    a:hover{
        color: white;
        text-decoration: underline;
    }
    a:active{
        color: white;
        text-decoration: none;
    }
    .text-shadow-paragraph{
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
    }
</style>

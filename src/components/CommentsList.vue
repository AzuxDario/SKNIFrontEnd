<template>
  <div v-if='comments != undefined'>
    <h3 class='text-xs-left' style='margin-top: 20px;'>Komentarze:</h3>
    <div v-for='comment in comments' :key='comment.id'>
      <v-card style='margin-top: 5px'>
        <v-card-title primary-title>
          <div>
            <div>
              <v-icon>person</v-icon> {{comment.user.user.username}}
              <v-icon>calendar_today</v-icon> {{comment.creation_date | moment('DD-MM-YYYY HH:mm:SS')}}
            </div>
            <div class='text-xs-left' style='margin-top: 10px;'>
              {{comment.text}}
            </div>
          </div>
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CommentModel } from '@/models/CommentModel';

@Component
export default class CommentsList extends Vue {
  @Prop() public comments!: CommentModel[];
}
</script>
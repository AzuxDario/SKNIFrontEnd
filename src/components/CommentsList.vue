<template>
  <div>
    <div
      v-for="comment in comments"
      :key="comment.id"
      style="border: 1px solid gray"
    >[{{comment.creation_date | moment("DD-MM-YYYY")}} {{comment.creation_date | moment("HH:mm:SS")}}] {{comment.user.user.username}} napisał: {{comment.text}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CommentModel } from "@/models/CommentModel";

@Component
export default class CommentsList extends Vue {
  @Prop() comments!: CommentModel[];
}
</script>